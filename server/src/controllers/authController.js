const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AuthController = {
  // Register (hanya dipakai sekali untuk bikin akun Admin)
  register: async (req, res) => {
    try {
      const { email, password } = req.body;

      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email sudah terdaftar'});
      }

      const newUser = await UserModel.createUser(email, password);
      res.status(201).json({
        success: true,
        message: 'Admin berhasil didaftarkan',
        data: newUser
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error saat Register' });
    }
  },

  // Login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Cek user ada atau tidak
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(400).json({ message: 'Email atau Password salah'});
      }

      // Cek password (bandingkan input user dengan hash di DB)
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Email atau Password salah'});
      }

      // Generate Token
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.json({
        success: true,
        message: 'Login Berhasil',
        token: token,
        user: {
          id: user.id,
          email: user.email
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error saat Login' });
    }
  }
};

module.exports = AuthController;