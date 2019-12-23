const BaseControlador = require("../controladores/base-controlador");
const baseControlador = new BaseControlador();

module.exports = app => {
  app.get("/", baseControlador.home());
};
