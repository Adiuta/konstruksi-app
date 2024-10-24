const express = require('express');
const router = express.Router();

// Halaman Utama
router.get('/', (req, res) => {
    res.render('index'); // Render halaman index.ejs
});

// Dashboard setelah login
router.get('/dashboard', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/auth/login'); // Redirect ke login jika belum login
    }
    res.render('dashboard'); // Render dashboard jika sudah login
});

module.exports = router;
