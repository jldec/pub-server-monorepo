/*eslint no-console: "off"*/

var test = require('tape');

test('noRobots', function(t) {

  var opts = require('pub-resolve-opts')(__dirname);

  var generator = require('pub-generator')(opts);

  opts.generatorPlugins.forEach(function(plugin) {
    require(plugin.path)(generator);
  });

  var actual;

  // intercept output writer to grab files instead of sending them to disk
  var osrc = opts.outputs[0].src;
  osrc.put = function(files, cb) {
    actual = files;
    // console.log(files);
    cb && cb();
  };

  var expected =
  [
    {
      path: '/index.html',
      text: '<!DOCTYPE html>\n' +
        '<head>\n' +
        '<meta name="robots" content="noindex, nofollow">\n' +
        '\n' +
        '<title>/</title>\n' +
        '</head>\n' +
        '<body>\n' +
        '<div data-render-page="/">\n' +
        '<div data-render-html="/"><h1 id="hello-world">hello world</h1>\n' +
        '</div>\n' +
        '</div><!--page-->\n' +
        '<script>window.pubRef = {"href":"/","relPath":""};</script>\n' +
        '\n' +
        '</body>\n' +
        '</html>'
    },
    {
      path: '/page1.html',
      text: '<!DOCTYPE html>\n' +
        '<head>\n' +
        '<meta name="robots" content="noindex, nofollow">\n' +
        '\n' +
        '<title>Page1</title>\n' +
        '</head>\n' +
        '<body>\n' +
        '<div data-render-page="/page1">\n' +
        '<div data-render-html="/page1"><h1 id="page-1">page 1</h1>\n' +
        '</div>\n' +
        '</div><!--page-->\n' +
        '<script>window.pubRef = {"href":"/page1","relPath":""};</script>\n' +
        '\n' +
        '</body>\n' +
        '</html>'
    },
    { path: '/robots.txt', text: 'user-agent: *\ndisallow: /\n' },
    {
      path: '/sitemap.xml',
      text: '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        '<url><loc>https://example.com/</loc></url>\n' +
        '<url><loc>https://example.com/page1</loc></url>\n' +
        '</urlset>\n'
    }
  ];

  generator.load(function(err) {
    t.error(err);
    generator.outputPages(function(err) {
      t.error(err);
      t.deepEqual(actual, expected);
      generator.unload();
      t.end();
    });
  });
});
