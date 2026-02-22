module.exports =
{
  'pub-pkg':        'pub-theme-doc',
  generatorPlugins: './plugins/generator-plugin.js',
  sources:          './templates',
  staticPaths: [
    { path:'./css/github-markdown-light.css', route:'/css', inject:true },
    { path:'./css/pub-theme-doc.css', route:'/css', inject:true }
  ]
};