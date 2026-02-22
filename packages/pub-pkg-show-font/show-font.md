---- /show-font ----
title: Show Font
template: show-font
text: The quick brown fox jumped over the lazy dog. ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 01234567890 | \ / + = _ - ~ # @ !¡ $ € £ % & ^ * ? ¿ ' " ` ” ’ , . ; : »« () [] {} <> ©® Ää Çç Éé Èè Îî Ññ Öö Üü ß
weight: 100
weight: 200
weight: 300
weight: 400
weight: 500
weight: 600
weight: 700
weight: 800
weight: 900

---- /show-font.hbs ----

<style>
#show-font { overflow-x:scroll; }
#show-font h3 { font-weight:normal; font-size:10px; margin:-8px 0 0 0; }
#show-font section { padding:1em; }
#show-font div.show-font { padding:2px; font-size: 24px; display: inline-block; margin:0 0 4px 0; white-space:nowrap; }
</style>

<div id="show-font">
<h2>font-family: </h2>

{{#each weight}}
<section>
<h3>font-weight: {{.}}</h3>
<div class="show-font" style="font-weight:{{.}};">{{../text}}</div>
<div class="show-font" style="font-style:italic; font-weight:{{.}};">{{../text}}</div>
</section>
{{/each}}

</div>

---- /js/show-font.js ----
nocrawl:1
notemplate:1

$(function(){
  $('#show-font h2').append(
    $('.show-font').css('font-family')
  );
});
