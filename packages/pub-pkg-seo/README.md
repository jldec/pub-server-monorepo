# pub-pkg-seo

This [pub-server](https://github.com/jldec/pub-server) package
provides a convenient way to generate sitemap.xml and robots.txt.

It can also inject a `<meta>` tag for robots and a canonical `<link>` tag, via handlebars helper {{{metaSeo}}}.

### installation
This package is included with [pub-server](https://github.com/jldec/pub-server).

-  add `pub-pkg-seo` to your pub-config `pkgs`

### usage

The generated **/robots.txt** file will allow all pages unless `noRobots:true` is set in pub-config.

Layout templates should embed {{{metaSeo}}} in the HTML header.
This will also inject a `<meta name="robots" content="noindex, nofollow">` unless `noRobots:true`

If `opts.canonicalUrl` is set to say `https://jldec.me`, the {{{metaSeo}} helper will include
`<link rel="canonical" href="https://jldec.me{page.href}">`, appending the href for each page.

The generated **/sitemap.xml** will include fully qualified links to all generated pages
except those with metadata values `nocrawl:true` or `nopublish:true`.

sitemap links will be qualified with the opts.appUrl prefix (also settable via the APP environment variable.)
