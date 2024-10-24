const express = require('express');
const router = express.Router();
const Pekerjaan = require('../models/pekerjaan'); // Pastikan ini sesuai dengan model pekerjaan

// Middleware untuk mengecek apakah user sudah login
function checkAuth(req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/login'); // Arahkan ke halaman login jika belum login
    }
    next();
}

// Halaman dashboard user biasa
router.get('/dashboard', checkAuth, async (req, res) => {
    try {
        const pekerjaan = await Pekerjaan.find(); // Ambil data pekerjaan dari database
        res.render('dashboard', { 
            user: req.session.userId,
            pekerjaan: pekerjaan // Kirim data pekerjaan ke view
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading dashboard');
    }
});

// Halaman dashboard admin
router.get('/admin/dashboard', checkAuth, async (req, res) => {
    if (req.session.role !== 'admin') {
        return res.redirect('/dashboard'); // Arahkan ke dashboard biasa jika bukan admin
    }
    try {
        const pekerjaan = await Pekerjaan.find(); // Ambil data pekerjaan dari database
        res.render('admin-dashboard', { 
            user: req.session.userId,
            pekerjaan: pekerjaan // Kirim data pekerjaan ke view admin
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading admin dashboard');
    }
});

module.exports = router;
