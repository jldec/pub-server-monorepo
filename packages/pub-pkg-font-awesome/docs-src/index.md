---- / ----
title: Icons
template: preview

## Icons

---- /preview.hbs ----

{{{html}}}

<div class="jstfy">
{{#eachFa~}}
<div class="blox">{{{faIcon name 'lg'}}}<span class="lbl">{{name}}</span></div>
{{/eachFa}}
</div>


---- /Condensed ----
template: condensed

## Condensed

---- /condensed.hbs ----

{{{html}}}

{{#eachFa~}}
<div title="{{{name}}}" class="blox">{{{faIcon name 'lg'}}}</div>
{{/eachFa}}


---- /css/pub-pkg-font-awesome-doc.css ----
nocrawl:1
notemplate:1

.jstfy { text-align:justify; }
.blox  { display:inline-block; text-align:center; cursor:pointer; }
.blox .lbl { display:block; width:100%; padding:0 0.5em 1em 0.5em; font-size:14px; color:#999; }
.blox .fa  { color:#34a7d6; line-height:1.6em; width:1.6em; }
.blox:hover .fa { color:#fff; background-color:#34a7d6; }
.blox:hover .lbl { color:#000; }


---- /.nojekyll ----
nocrawl:1
notemplate:1

