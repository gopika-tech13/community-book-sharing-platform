const db = require("../config/db");

exports.register = (req, res) => {
  const { name, email, password, college, city } = req.body;

  const sql =
    "INSERT INTO users(name,email,password,college,city) VALUES(?,?,?,?,?)";

  db.query(
    sql,
    [name, email, password, college, city],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Registration successful",
      });
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const sql =
    "SELECT * FROM users WHERE email=? AND password=?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    res.json(result[0]);
  });
};