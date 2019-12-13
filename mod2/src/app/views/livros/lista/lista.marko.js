// Compiled using marko@4.13.4-1 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/casadocodigo$1.0.0/src/app/views/livros/lista/lista.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_forEach = marko_helpers.f,
    marko_escapeXml = marko_helpers.x;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<html><head> <meta charset=\"utf-8\"></head><h1> Casa do código </h1><table><tr><td>ID</td><td>Título</td></tr>");

  var for__8 = 0;

  marko_forEach(data.livros, function(item) {
    var keyscope__9 = "[" + ((for__8++) + "]");

    out.w("<tr><td>" +
      marko_escapeXml(item.id) +
      "</td><td>" +
      marko_escapeXml(item.titulo) +
      "</td></tr>");
  });

  out.w("</table></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/casadocodigo$1.0.0/src/app/views/livros/lista/lista.marko"
  };
