const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Token bulunamadı" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Geçersiz token", details: err.message });
  }
};

router.get("/", verifyToken, async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "Kimlik doğrulama başarısız" });
    }
    const result = await pool.query(
      "SELECT id, text, description, completed, category, to_char(date, 'YYYY-MM-DD') AS date FROM todos WHERE user_id = $1 ORDER BY id DESC",
      [req.user.userId]
    );
    res.json({ todos: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.post("/", verifyToken, async (req, res) => {
  const { text, description, category, date } = req.body;
  if (!text || !description) {
    return res.status(400).json({ error: "text ve description zorunludur" });
  }
  const finalDate = date || new Date().toISOString().slice(0, 10);
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "Kimlik doğrulama başarısız" });
    }
    const insert = await pool.query(
      "INSERT INTO todos (user_id, text, description, category, date) VALUES ($1, $2, $3, $4, $5) RETURNING id, text, description, completed, category, to_char(date, 'YYYY-MM-DD') AS date",
      [req.user.userId, text, description, category || "Genel", finalDate]
    );
    res.status(201).json({ todo: insert.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

// Toggle/Update completion
router.patch("/:id/toggle", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { forceTrue } = req.body || {};
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "Kimlik doğrulama başarısız" });
    }
    const current = await pool.query(
      "SELECT completed FROM todos WHERE id = $1 AND user_id = $2",
      [id, req.user.userId]
    );
    if (current.rows.length === 0) return res.status(404).json({ error: "Bulunamadı" });
    const nextVal = forceTrue !== undefined ? !!forceTrue : !current.rows[0].completed;
    const updated = await pool.query(
      "UPDATE todos SET completed = $1 WHERE id = $2 AND user_id = $3 RETURNING id, text, description, completed, category, to_char(date, 'YYYY-MM-DD') AS date",
      [nextVal, id, req.user.userId]
    );
    res.json({ todo: updated.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "Kimlik doğrulama başarısız" });
    }
    const result = await pool.query("DELETE FROM todos WHERE id = $1 AND user_id = $2", [id, req.user.userId]);
    if (result.rowCount === 0) return res.status(404).json({ error: "Bulunamadı" });
    res.json({ message: "Silindi" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

module.exports = router;


