module.exports = function(generator) {

  var opts = generator.opts;
  var hb = generator.handlebars;

  // block helper over all {name: glyph:} sorted by glyph
  hb.registerHelper('editorPrefix', function(_frame) {
    return opts.editorPrefix;
  });
};
