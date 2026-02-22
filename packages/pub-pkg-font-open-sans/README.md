## pub-pkg-font-open-sans
- Enables [Open Sans]() for any [pub-server](https://github.com/jldec/pub-server) design.
- Serves fonts to browsers in woff, woff2, and eot formats.


### Installation
1. `npm install --save pub-pkg-font-open-sans`
2. add `pub-pkg-font-open-sans` to your pub-config `pkgs`
3. use the font-family in your CSS E.g.

```css
body {
  font-family:"Open Sans";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```


### CSS
This package will inject a link pointing to [/css/open-sans.css](/css/open-sans.css) into your main template.

When you generate to output, the css and font files will be included under `/css` and `/css/fonts`. 

### Why distribute fonts with your website?
- to work offline
- to reduce the number of 3rd parties visitors to your site will need to trust.

The drawback is that the fonts are less likely to be in readers' cache, and will consume bandwidth.

Including only **eot**, **woff** and **woff2** formats makes the site lighter to host, without significantly reducing browser platform coverage.


### npm dependencies
Font files are npm installed via [open-sans-fontface](https://www.npmjs.com/package/open-sans-fontface)


### Font Attribution
Steve Matteson - Apache License 2.0
