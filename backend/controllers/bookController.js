const db = require("../config/db");

exports.getBooks = (req, res) => {
  db.query("SELECT * FROM books", (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

exports.addBook = (req, res) => {
  const {
    owner_id,
    title,
    author,
    category,
    description,
    book_type
  } = req.body;

  const sql =
    "INSERT INTO books(owner_id,title,author,category,description) VALUES(?,?,?,?,?)";

  db.query(
    sql,
    [owner_id, title, author, category, description,book_type],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Book added successfully",
      });
    }
  );
};