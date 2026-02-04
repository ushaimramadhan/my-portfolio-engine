const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Ambil token dari Header
  // Format biasanya: "Bearer <token>"
  const authHeader = req.headers['authorization'];

  // pisahkan kata "Bearer" dan ambil tokennya saja
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Akses Ditolak! Token tidak ditemukan.'});
  }

  try {
    // Verifikasi token dengan kunci rahasia
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Simpan data user ke dalam request agar bisa dipakai di controller
    req.user = decoded;

    // Lanjut ke controller
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token tidak valid!'})
  }
};

module.exports = verifyToken;