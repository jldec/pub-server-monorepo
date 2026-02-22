/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "u", "argsIgnorePattern": "frame", }]*/

module.exports = function(generator) {
  var u = generator.util;
  var opts = generator.opts;
  var log = opts.log;
  var hb = generator.handlebars;

  if (!opts.appUrl || /\/\/localhost/.test(opts.appUrl)) {
    log('WARNING: pub-pkg-seo sitemap using appUrl "%s"', opts.appUrl);
  }

  hb.registerHelper('metaSeo', function(frame) {
    var s = [];
    if (opts.noRobots || this.nocrawl) {
      s.push('<meta name="robots" content="noindex, nofollow">');
    }
    if (opts.canonicalUrl) {
      s.push('<link rel="canonical" href="' + opts.canonicalUrl + this._href + '">');
    }
    return s.join('\n');
  });

};
