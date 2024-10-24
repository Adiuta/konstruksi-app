const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Pastikan model user sudah benar
const router = express.Router();
const passport = require('passport');

// Halaman Sign Up
router.get('/signup', (req, res) => {
    res.render('signup', { message: null });
});

// Proses Pendaftaran
router.post('/signup', async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        // Cek apakah username atau email sudah ada
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.render('signup', { message: 'Username atau email sudah terdaftar. Silakan pilih yang lain.' });
        }

        // Hash password sebelum menyimpannya
        const hashedPassword = await bcrypt.hash(password, 10);

        // Buat user baru
        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            role: 'user', // Set role default sebagai user biasa
        });

        await newUser.save(); // Simpan user ke database

        res.redirect('/login'); // Arahkan ke halaman login setelah berhasil sign up
    } catch (err) {
        console.error(err);
        res.render('signup', { message: 'Terjadi kesalahan. Silakan coba lagi.' });
    }
});

// Halaman Login
router.get('/login', (req, res) => {
    res.render('login', { message: null });
});


// Proses Login
router.post('/login', async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;

        // Cari user berdasarkan username atau email
        const user = await User.findOne({
            $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
        });

        if (!user) {
            // Pengguna belum terdaftar, kirim alert dan arahkan ke halaman signup
            return res.render('login', { 
                errorMessage: 'Pengguna tidak ditemukan. Daftar sekarang!', 
                redirectToSignup: true 
            });
        }

        // Cek apakah password yang dimasukkan cocok
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.render('login', { message: 'Password salah.' });
        }

        // Simpan user ke dalam session
        req.session.userId = user._id;
        req.session.role = user.role;

        // Jika bukan admin, arahkan ke dashboard biasa
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.render('login', { message: 'Terjadi kesalahan saat login. Silakan coba lagi.' });
    }
});

// Logout User
router.get('/logout', (req, res) => {
    req.session.destroy(); // Hapus session
    res.redirect('/login'); // Arahkan ke halaman login
});

module.exports = router;
