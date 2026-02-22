module.exports =
{
  'pub-pkg': 'pub-pkg-prism',

  staticPaths: [
    { path:'./css/prism.css', route:'/css', inject:true }
  ],

  generatorPlugins: './generator-plugin.js'
};
