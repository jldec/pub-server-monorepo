/**
 * pub-server serve-sessions.js
 *
 * Copyright (c) 2015-2026 Jürgen Leschner - github.com/jldec - MIT license
**/

var u = require('pub-util');

module.exports = function serveSessions(server) {

  if (!(this instanceof serveSessions)) return new serveSessions(server);
  var self = this;

  // sugar
  var app         = server.app;
  var opts        = server.opts;
  var log         = opts.log;
  var redisOpts   = opts.redis; // may be undefined

  // default opts values allow override from opts.session
  var sessionOpts = u.assign( {
    name: 'pss',
    resave: false,
    saveUninitialized: true,
    rolling: true,
    secret: process.env.SSC || (!redisOpts && u.str(Math.random()).slice(2)),
    cookie: { secure:opts.production, maxAge:60*60*1000, sameSite:'lax' }
  }, opts.session);

  if (!('sameSite' in sessionOpts.cookie)) {
    sessionOpts.cookie.sameSite = 'lax'; // default to lax
  }

  // attach authz api to server (in case we move to non-session-based identity)
  server.isAuthorized = isAuthorized;

  // ACLs = comma separated lists of email addresses (note legacy env settings)
  sessionOpts.acl = sessionOpts.acl || {};
  sessionOpts.acl.ADMIN = process.env.ACL_ADMIN || '';

  // if no auth configured, force all requests to authenticate as opts.user
  if (!opts.auth && opts.user) {
    opts.auth = { auto:opts.user } ;
    app.use(function(req, res, next) { req.user = opts.user; next(); });
    sessionOpts.acl.ADMIN = sessionOpts.acl.ADMIN + ',' + opts.user;
  }

  // memoized acl regexps (others are created on-demand)
  var aclRe = { ADMIN: reAccess(sessionOpts.acl.ADMIN) };

  if (opts.auth && opts.auth.auto) {
    log('auto-authenticating',
      isAuthorized('ADMIN', opts.user) ? '(admin)' : '',
      opts.user );
  }

  var expressSession = self.expressSession = require('express-session');

  // redis is optional
  if (redisOpts) {

    // allow true or 1 but coerce opts to {} to use defaults
    // NOTE: same logic in src-redis/pub-src-redis.js
    let redisOptions = u.assign({}, redisOpts);

    redisOptions.url = `redis${
        redisOptions.rediss || process.env.RCS ? 's' : ''
    }://default:${process.env.RCA || ''}@${
      redisOptions.host || process.env.RCH || 'localhost'
    }:${redisOptions.port || process.env.RCP || '6379'}`;

    delete redisOptions.host;
    delete redisOptions.port;
    delete redisOptions.rediss;
    delete redisOptions.auth_pass; // ignored - must use env var
    delete redisOptions.password;  // ignored - must use env var

    var redisLib = require('redis');
    var redis = self.redis = redisLib.createClient(redisOptions);

    redis.on('error', function(err) { log(err); });
    server.on('shutdown', function() { redis.end(); });

    // https://github.com/tj/connect-redis
    var RedisStore = require('connect-redis')(expressSession);

    // store must live in sessionOpts.store for expressSession to use it
    self.store = sessionOpts.store = new RedisStore( { client:redis, prefix:redisOptions._sess || 'pub-sess:' } );

    // push system log into redis
    if (redisOptions._log) {
      log.logger.on('log', redisLog);
      log.logger.on('error', function(e) { redisLog(e.stack || e); });
    }

    log(`redis${redisOptions.rediss || process.env.RCS ? 's' : ''}`, redisOptions.host || process.env.RCH || 'localhost');

    // TODO: use redis stream instead of list
    function redisLog(s) {
      redis.lpush(redisOptions._log, u.date().format('yyyy-mm-dd HH:MM:ss:l ') + s);
    }
  }

  app.use(expressSession(sessionOpts));

  if (sessionOpts.saveOldSessions) { saveOldSessions(); }

  if (!sessionOpts.noLogRequests) {
    app.use(sessionOpts.logRequestPath || '/server/log', logRequest);
  }

  // this needs to be called after auth handler
  self.authorizeRoutes = function() {

    // protect /admin and /pub routes - call login handler or pretend not found and throw
    app.use('/admin', function(req, res, next) { authorizeRoute('ADMIN', req, res, next); });
    app.use('/pub',   function(req, res, next) { authorizeRoute('EDIT',  req, res, next); });

    app.get('/server/logout', logout);
    app.get('/admin/log', systemLog);
    app.get('/admin/opts', showopts);
  };

  //--//--//--//--//--//--//--//--//--//--//

  function logRequest(req, res) {
    var session = req.session;
    if (!session) return res.send( { noSession:1 } );

    // start by logging all query params
    var entry = u.clone(req.query || {});

    entry[sessionOpts.logTime || 't'] =
      session.ts ? (Date.now() - session.ts) / 1000 | 0 : 0;

    entry[sessionOpts.logPath || 'p'] = req.path;

    if (!session.log) {
      session.log = [];
      session.ts = Date.now();
      if (req.get('user-agent')) { session.ua = req.get('user-agent'); }
    }

    var n = session.log.push(entry);
    res.send( { n:n } );
  }

  function systemLog(req, res) {
    if (!redisOpts || !redisOpts._log) return res.status(500).send(['no redis log']);

    redis.lrange(redisOpts._log, 0, req.query.n || 200, function(err, log) {
      if (err) return res.status(500).send(err);
      res.send(log);
    });
  }

  function logout(req, res) {
    if (req.session) return req.session.destroy(function() { res.send('OK'); });
    res.send( { session: 'no-session' } );
  }

  function authorizeRoute(acl, req, res, next) {
    if (isAuthorized(acl, req.user)) return next();
    if (server.login) return server.login(req, res);
    log('Oops, unauthorized page %s, missing server.login', req.path);
    res.status(404).end();
  }

  // low-level authz api - returns true if user matches or belongs to acl
  function isAuthorized(acl, user) {
    acl = u.str(acl).toUpperCase();
    user = u.str(user).toUpperCase();
    if (user && user === acl) return true;
    if (!aclRe[acl]) {
      aclRe[acl] = reAccess(sessionOpts.acl[acl] || process.env['ACL_' + acl]);
    }
    return aclRe[acl].test(user) || aclRe.ADMIN.test(user);
  }

  // turns ACLs into regexps
  function reAccess(s) {
    var list = s ? s.split(/[, ]+/) : [];      // avoid ['']
    return new RegExp(
      u.map(list, function(s) {
        return '^' + u.escapeRegExp(s) + '$';  // exact matches only
      }).join('|')                           // join([]) returns ''
      || '$(?=.)'                              // avoid default regexp /(?:)/
      , 'i');                                  // not case-sensitive
  }

  // replace session.store destroy handler with a replacement
  // which saves a copy of the session using sid_d first
  function saveOldSessions() {
    var db = self.store;
    var oldDestroy = db.destroy;
    db.destroy = newDestroy;
    return;

    // rename instead of delete
    function newDestroy(sid, cb) {
      db.get(sid, function(err, session) {
        if (err) return cb(err);
        if (!session) return cb();
        db.set(sid + '_d', session, function(err) {
          if (err) return cb(err);
          oldDestroy.call(db, sid, cb);
        });
      });
    }
  }

  function showopts(req, res) {
    res.send(u.htmlify(u.omit(opts, 'session')));
  }

};
