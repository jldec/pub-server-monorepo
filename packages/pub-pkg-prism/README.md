---- / ----
name: README

# pub-pkg-prism

[pub-server](https://github.com/jldec/pub-server) plugin for syntax highlighting with [prism.js](https://github.com/LeaVerou/prism.git) v1.26.

Runs inside pub-generator during markdown processing -- no client-side javascript required.

Includes language support for markup, css, clike, javascript, c, csharp, cpp, fsharp, go, go-module, handlebars, java, makefile, markdown, markup-templating, perl, php, python, jsx, tsx, ruby, rust, sql, swift, typescript, typoscript, wasm.

A website with some examples can be found at https://jldec.github.io/pub-pkg-prism

### installation

This package is included with pub-server.

To enable it, add `pub-pkg-prism` to your pub-config `pkgs`.

Markdown code blocks will be automatically highlighted by pub-generator using [marked](https://marked.js.org/#/USING_ADVANCED.md#options), synchronously calling prism.hightlight().

## CSS

This package will inject `/css/prism.css` into your main template provided it includes `{{{injectCss}}}`.

### credits

Based on [prism.js](https://github.com/LeaVerou/prism.git) by Lea Verou - https://github.com/LeaVerou
