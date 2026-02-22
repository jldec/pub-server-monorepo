module.exports = function(generator) {

  var u = generator.util;
  var opts = generator.opts;
  var hb = generator.handlebars;

  hb.registerHelper('navIcon', function(frame) {

    return hb.defaultFragmentHtml('/#navicon',
      '_!bars fw lg_',
      '<span class="icon">=</span>',
      frame);
  });

  hb.registerHelper('docTitle', function(frame) {
    var title = opts.docTitle || opts.pkgName || 'pub-server';
    var subTitle = opts.docSubTitle || '';

    return hb.defaultFragmentHtml('/#doctitle',
      '# [' + title + '](/)\n' + subTitle,
      '<h1><a href="/">' + u.escape(title) + '</a></h1>' + subTitle,
      frame);
  });

  hb.registerHelper('topMenu', function(frame) {
    var url = opts.github || hb.githubUrl();

    return hb.defaultFragmentHtml('/#topmenu',
      url ? '- [_!github lg fw_](' + url + ' "github")' : '',
      url ? '<ul><li><a href="' + url + '">github</a></li></ul>' : '',
      frame);
  });

};
