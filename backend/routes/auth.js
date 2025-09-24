const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message:"Token bulunamadı" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ 
      error: "Geçersiz token",
      details: err.message 
    });
  }
};


router.get("/verify", verifyToken, (req, res) => {
  res.json({ 
    user: req.user 
  });
});

router.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    return res.status(400).json({ error: "Tüm alanlar zorunludur" });
  }
  try {
    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Şifreniz en az 8 karakter olmalıdır" });
      
    }
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: "Bu email zaten kayıtlı" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (userName, email, password_hash) VALUES ($1, $2, $3)",
      [userName, email, hashedPassword]
    );
    res.status(201).json({ message: "Kayıt başarılı" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Tüm alanlar zorunludur" });
  }
  try {
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: "Geçersiz email veya şifre" });
    }
    const user = userResult.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(400).json({ error: "Geçersiz email veya şifre" });
    }

    const token = jwt.sign(
      { userId: user.user_id, email: user.email, userName: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });
    res.json({ message: "Giriş başarılı" });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });
  res.json({ message: "Çıkış yapıldı" });
});

module.exports = router;