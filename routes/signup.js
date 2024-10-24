const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Rute untuk registrasi
router.post('/signup', async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    try {
        // Cek apakah email sudah terdaftar
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('signup', { errorMessage: 'Email sudah digunakan. Silakan gunakan email lain.' });
        }

        // Hash password sebelum menyimpan ke database
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Buat pengguna baru dan simpan ke database
        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.redirect('/login'); // Redirect ke halaman login setelah sukses daftar
    } catch (error) {
        console.error('Terjadi kesalahan saat registrasi:', error);
        res.render('signup', { errorMessage: 'Terjadi kesalahan. Silakan coba lagi.' });
    }
});

module.exports = router;
