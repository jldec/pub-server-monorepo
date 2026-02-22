## pub-serve-sessions

Cookie-based session plugin for [pub-server](https://github.com/jldec/pub-server) based on [express-session](https://github.com/expressjs/session) and [connect-redis](https://github.com/tj/connect-redis). Using a redis store allows the server to be restarted without dropping user sesssions.

This package is manually tested with [pub-test-auth](https://github.com/jldec/pub-test-auth).

### Installation

This package is included with pub-server

### Usage

Session options may be maintained in `opts.session` in `pub-config`. For details of available options see [express-session](https://github.com/expressjs/session#options). Default values are listed below; a value for `session.secret` (or `process.env.SSC`) is required when sessions are persisted in redis.

```js
opts.session =
  { name: 'pss',
    resave: false,
    saveUninitialized: true,
    rolling: true,
    secret: process.env.SSC || (!resisOpts && u.str(Math.random()).slice(2)),
    cookie: { secure:opts.production, maxAge:60*60*1000 } }
```

Session storage with with redis is enabled by setting `opts.redis` in `pub-config` and, if necessary, configuring the redis credentials via environment variables. See [node-redis](https://github.com/NodeRedis/node-redis#options-object-properties) for configuration options.

```js
opts.redis =
{ prefix: 'pub-test-auth:', // prefix all keys (sessions and logs)
  _sess:  'session:',       // capture sessions using keys <prefix><_sess><sid>
  _log:   'log:' };         // capture system logs using list key <prefix><_log> (see below)
```

To configure redis using environment variables:

```sh
export RCH=localhost # host: default = localhost, can also be configured via opts.redis.host
export RCP=6379      # port: default = 6379, can also be configured via opts.redis.port
export RCA=xxx       # auth_pass: default blank, can only be configured via environment
export RCS=1         # use rediss if set - default = unset, can also configure via opts.rediss
```

> [!NOTE]
> This package uses node-redis [v3.1.2](https://github.com/redis/node-redis/blob/master/CHANGELOG.md#v312) with callbacks.
> Support for rediss was added in v2.0.0 of this package. See [url option](https://github.com/redis/node-redis/tree/v3.1.2?tab=readme-ov-file#options-object-properties)

### System logs

Modules in pub-server call a global 'opts.log(...)' provided by [logger-emitter](https://github.com/jldec/logger-emitter) to show warnings and errors on the console.

If you set `opts.redis._log = <key-name>`, the same events will be timestamped and logged into a [redis list](https://redis.io/topics/data-types-intro).

### Session logs

pub-server can record clicks and other events generated in the browser via the `/server/log/<path>?<params>` api.

HTTP requests sent to this endpoint will stored as objects containing the request path and parameters in the `session.log` and, if redis is enabled, automatically persisted with the session. E.g.

```js
fetch('/server/log' + location.pathname + (location.search || ''), { method:'POST'});
```

The default `/server/log` route can be configured by setting 'opts.session.logRequestPath'.

### Configuring session-based access control

Access control is configured on the server using environment variables `ACL_READ`, `ACL_EDIT`, `ACL_ADMIN`. These restrict read access to all pages (except those with `access:everyone`), edit access, and admin access respectively. Editors can also read, and admins can edit and read.

Each of the 3 ACLs contains a comma-separated list of user ids (typically email addresses). These are matched with the `session.user` at run time, which is established by an authentication plugin such as [pub-pkg-google-oauth](https://github.com/jldec/pub-pkg-google-oauth).

E.g. To grant yourself admin rights, and 3 other users read access:

```sh
export ACL_ADMIN={your-email}
export ACL_READ={email-1},{email-2},{email-3}
```

