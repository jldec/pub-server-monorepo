/*
 * pub-pkg-prism pub-generator plugin
*/

var Prism = require('./js/prism.js');

module.exports = function(generator) {
  var opts = generator.opts;

  // api matches https://marked.js.org/#/USING_ADVANCED.md#options
  opts.highlight = function(code, lang) {
    var grammar = Prism.languages[lang];
    return grammar ? Prism.highlight(code, grammar, lang) : code;
  };
};
