# pub-theme-doc

[pub-server](https://github.com/jldec/pub-server) default theme with responsive sidebar.

![](/images/largescreen.png)


### installation

This theme is included with pub-server.

To use this theme in a project, include "pub-theme-doc" in the "pkgs" array in pub-config.js.

This theme will reference [pub-pkg-font-awesome](https://jldec.github.io/pub-pkg-font-awesome)
icons, if included in `pkgs`. For syntax highlighting, combine this theme with either [pub-pkg-prism](https://github.com/jldec/pub-pkg-prism) or [pub-pkg-highlight](https://github.com/jldec/pub-pkg-highlight).


### to customize the header text and github url
In pub-config set the following:

- `opts.docTitle` and optionally `opts.docSubTitle`
- `opts.github`


### to customize the header content structure
In your downstream project create fragments with the following names, to replace the defaults.


    ---- /#navicon ----

    _!bars fw lg_

    ---- /#doctitle ----

    # [Awesome Framework](/)
    documentation

    ---- /#topmenu ----

    - [](/about-us)
    - [_!github lg fw_](https://github.com/jldec/pub-server)


### responsive view
On small screens, the navigation sidebar will be hidden, and appear when hovering over the navicon.

![](/images/smallscreen.png)


### credits
- github-like markdown css thanks to https://github.com/sindresorhus/github-markdown-css
