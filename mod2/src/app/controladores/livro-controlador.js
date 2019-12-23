const LivroDao = require("../infra/livro-dao");
const db = require("../../config/database");

const { validationResult } = require("express-validator");
const template = require("../views/template");

class LivroControlador {
  static rotas() {
    return {
      lista: "/livros",
      cadastro: "/livros/form",
      edicao: "/livros/form/:id",
      delecao: "/livros/:id"
    };
  }
  lista() {
    return function(req, resp) {
      const livroDao = new LivroDao(db);
      livroDao
        .lista()
        .then(livros => resp.marko(template.livros.lista), {
          livros: livros
        })
        .catch(erro => console.log(erro));
    };
  }

  formularioCadastro() {
    return function(req, resp) {
      resp.marko(template.livros.form, { livro: {} });
    };
  }

  formularioEdicao() {
    return function(req, resp) {
      const id = req.params.id;
      const livroDao = new LivroDao(db);

      livroDao
        .buscaPorId(id)
        .then(livro =>
          resp.marko(template.livros.form, {
            livro: livro
          })
        )
        .catch(erro => console.log(erro));
    };
  }

  cadastra() {
    return function(req, resp) {
      try {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
          return resp.marko(template.livros.form, {
            livro: req.body,
            errosValidacao: errors.array()
          });
        }
        const livroDao = new LivroDao(db);
        livroDao
          .adiciona(req.body)
          .then(resp.redirect(LivroControlador.rotas().lista))
          .catch(erro => console.log(erro));
      } catch (erro) {
        console.log("dd");
      }
    };
  }

  edita() {
    return function(req, resp) {
      console.log(req.body);
      const livroDao = new LivroDao(db);

      livroDao
        .atualiza(req.body)
        .then(resp.redirect(LivroControlador.rotas().lista))
        .catch(erro => console.log(erro));
    };
  }

  remove() {
    return function(req, resp) {
      const id = req.params.id;

      const livroDao = new LivroDao(db);
      livroDao
        .remove(id)
        .then(() => resp.status(200).end())
        .catch(erro => console.log(erro));
    };
  }
}

module.exports = LivroControlador;
