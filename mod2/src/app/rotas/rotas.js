const LivroDao = require("../infra/livro-dao");
const db = require("../../config/database");

module.exports = app => {
  app.get("/", (req, resp) => {
    resp.marko(require("../views/livros/lista/lista.marko"), {
      livros: [
        {
          id: 1,
          titulo: "Fundamentos do Node"
        },
        {
          id: 2,
          titulo: "Node Avançado"
        }
      ]
    });
  });
  app.get("/livros", (req, resp) => {
    const livroDao = new LivroDao(db);
    livroDao.lista((erro, resultados) => {
      resp.marko(require("../views/livros/lista/lista.marko"), {
        livros: resultados
      });
    });
  });
};
