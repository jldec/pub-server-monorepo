# pub-pkg-font-awesome

[https://jldec.github.io/pub-pkg-font-awesome](https://jldec.github.io/pub-pkg-font-awesome/readme)

Enables [Font Awesome v4.7.0](https://fontawesome.com/v4.7.0/) glyphs from any [pub-server](https://github.com/jldec/pub-server) markdown.


## Installation

1. install `pub-pkg-font-awesome` with `npm install --save pub-pkg-font-awesome`
2. add `pub-pkg-font-awesome` to your pub-config `pkgs`


## CSS

This package will inject `<link rel="stylesheet" href="/css/font-awesome.css">` into your main template.

Alternatively, if you set `inject:false` on the theme, you can use one of the other mechanisms described [here](https://fontawesome.com/v4.7.0/get-started/).

**Note**: Unlike the regular font-awesome.css, this package does not include a class for every icon. The Markdown renderer will insert the correct icon unicode character into the generated HTML without help from CSS.


## Usage from Markdown

This package includes a customized [marked](https://github.com/markedjs/marked) renderer.

`_!{icon-name}_` in your markdown, will render `<span class="fa">{icon-glyph-code}</span>`

E.g. in link text:

```md
[Link to facebook _!facebook_](your-facebook-url)
```

> [Link to facebook _!facebook_](your-facebook-url)

Or in a heading:

```md
### _!warning_ Warning
```

> ### _!warning_ Warning

For a complete list of all the icon names see https://jldec.github.io/pub-pkg-font-awesome


##### Controlling icon size and other features

You can add css classnames (without the fa- prefix) after the icon name, separated with space. E.g.

```md
_!spinner 3x spin_
```

> _!spinner 3x spin_

Supported classnames include: `lg`, `2x`, `3x`, `4x`, `5x`, `spin`, `pulse`, `border`, `rotate-90`, `rotate-180`, `rotate-270`, `flip-horizontal`, and `flip-vertical`

`pull-left` and `pull-right` are not supported from markdown, but can be used from a template)


For examples of icons with the css classnames see https://fontawesome.com/v4.7.0/examples/


## Usage from handlebars

For additional control of the rendered HTML, this package includes the following Handlebars Helpers

- `{{{faGlyph name}}}`
  produces the glyph unicode for insertion into HTML e.g. `{{{faGlyph yen}}}` generates `&#xf157`.

- `{{{faIcon name extra}}}`
  produces the same HTML as the markdown `_!name extra_`.

- `{{#eachFa}}{{/eachFa}}`
  Block helper for enumerating all the glyphs. The iterator produces {name: glyph:} for each icon.


E.g. The HTML for the Condensed icon-list page was generated using the following:

```html
{{#eachFa~}}
<div class="blox">{{{faIcon name}}}</div>
{{/eachFa}}
```


## [Font Awesome v4.7.0 License](https://fontawesome.com/v4.7.0/license/)

#### Font License
- Applies to all desktop and webfont files in the fonts directory:
- License: SIL OFL 1.1
- URL: https://scripts.sil.org/OFL

#### Code License
- Applies to CSS and LESS files in the following directories: font-awesome/css/, font-awesome/less/, and font-awesome/scss/.
    License: MIT License
    URL: https://opensource.org/licenses/MIT-license.html

#### Documentation License
- Applies to all Font Awesome project files that are not a part of the Font or Code licenses.
- License: CC BY 3.0
- URL: https://creativecommons.org/licenses/by/3.0/

#### Brand Icons
- All brand icons are trademarks of their respective owners.
- The use of these trademarks does not indicate endorsement of the trademark holder by Font Awesome, nor vice versa.
- Brand icons should only be used to represent the company or product to which they refer.
- Please do not use brand logos for any purpose except to represent that particular brand or service.

## Plugin code
(c) Jürgen Leschner -- github.com/jldec -- MIT License
