// pub-config for the pub-pkg-font-awesome doc site

var opts = module.exports = {
  docTitle:    'pub-pkg-font-awesome',
  appUrl:      'https://jldec.github.io/pub-pkg-font-awesome',
  github:      'https://github.com/jldec/pub-pkg-font-awesome',

  pkgs:        ['pub-theme-doc', 'pub-pkg-seo', '..'],
  sources:     [{ path:'../README.md', writable:true },
                { path:'./index.md', writable:true } ],
  staticPaths: ['../.gitignore'],
  injectCss:   ['/css/pub-pkg-font-awesome-doc.css'],
  outputs:     [{ path:'../docs', relPaths:1 }],

  copyright:   'Copyright (c) 2015-2022 Jürgen Leschner - github.com/jldec - MIT License'
}
