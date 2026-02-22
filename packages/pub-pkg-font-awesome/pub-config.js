module.exports = {

  'pub-pkg': 'pub-pkg-font-awesome',

  staticPaths: [
    { path: './fonts', route: '/fonts' },
    { path: './css/font-awesome.css', route: '/css', inject:true }  // Note CSS uses relative paths to ../fonts
  ],

  generatorPlugins: './generator-plugin.js'
};