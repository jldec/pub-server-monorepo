module.exports = {

  'pub-pkg': 'pub-pkg-font-open-sans',

  staticPaths: [
    { path:'./open-sans.css', route:'/css', inject:true },
    { path:'./node_modules/open-sans-fontface/fonts', route:'/css/fonts', glob:'**/*.{eot,woff,woff2}', maxAge:'1000d' }
  ]

};
