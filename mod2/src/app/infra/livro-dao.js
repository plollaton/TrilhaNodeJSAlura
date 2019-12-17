class LivroDao {
  constructor(db) {
    this._db = db;
  }

  lista() {
    return new Promise((resolve, reject) => {
      this._db.all("SELECT * FROM livros", (erro, resultados) => {
        if (erro) return "Não foi possível listar os livros.";
        return resolve(resultados);
      });
    });
  }

  adiciona(livro) {
    return new Promise((resolve, reject) => {
      this._db.run(
        `INSERT INTO livros(titulo, preco, descricao) VALUES (?,?,?)`,
        [livro.titulo, livro.preco, livro.descricao],
        err => {
          if (err) {
            console.log(err);
            return reject("Não foi possível adicionar o livro");
          }
        }
      );
    });
  }

  buscaPorId(id) {
    return new Promise((resolve, reject) => {
      this._db.get("SELECT * FROM livros WHERE id = ?", [id], (err, row) => {
        if (err) {
          console.log(err);
          return reject(`Um erro ocorreu ao realizar a consulta.`);
        }
        if (!row) {
          console.log("Nao localizado");
          return reject(`Não localizado nenhum livro com o id: ${id}.`);
        }
        return resolve(row);
      });
    });
  }

  autaliza(livro) {
    return new Promise((resolve, reject) => {
      this._db.run(
        `UPDATE livros 
            SET titulo = ?,
                preco = ?,
                descricao = ?
          WHERE id = ?`,
        [livro.titulo, livro.preco, livro.descricao, livro.id],
        err => {
          if (err) {
            console.log(err);
            return reject(`Não foi possível atualizar o livro ${livro.id}.`);
          }
          return resolve();
        }
      );
    });
  }

  remove(id) {
    return new Promise((resolve, reject) => {
      this._db.run(`DELETE FROM livros WHERE id = ?`, [id], err => {
        if (err) {
          console.log(err);
          return reject(`Não foi possível excluir o livro ${id}.`);
        }
        return resolve();
      });
    });
  }
}

module.exports = LivroDao;
