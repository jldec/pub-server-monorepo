module.exports = {

  appUrl: 'https://jldec.github.io/pub-pkg-prism',
  docTitle: 'pub-pkg-prism',
  github: 'https://github.com/jldec/pub-pkg-prism',
  copyright: 'Copyright (c) 2015-2022 Jürgen Leschner - github.com/jldec - MIT license',

  // replace '..' below with 'pub-pkg-prism' if directory is copied
  pkgs: ['..', 'pub-pkg-seo', 'pub-theme-doc', 'pub-pkg-font-awesome'],

  sources: [
    '../README.md',
    { path:'./pages', writable:1 }
  ],

  staticPaths: [
    './.gitignore',
    './.nojekyll',
    './CNAME'
  ],

  outputs: { path:'../docs', relPaths:1 },
  noRobots: 1,
  linkNewWindow: 1
}
