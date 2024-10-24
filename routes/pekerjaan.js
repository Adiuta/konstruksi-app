const express = require('express');
const router = express.Router();
const Pekerjaan = require('../models/pekerjaan');

// Dapatkan semua pekerjaan
router.get('/', async (req, res) => {
  const pekerjaan = await Pekerjaan.find();
  res.render('dashboard', { pekerjaan });
});

module.exports = router;
