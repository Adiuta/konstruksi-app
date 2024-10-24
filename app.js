const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard'); // Tambahkan rute dashboard
const signupRoutes = require('./routes/signup')

const app = express();

// Setup view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Middleware session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Rute untuk halaman utama
app.get('/', (req, res) => {
    res.render('index'); // Pastikan Anda memiliki file index.ejs
});

// Routes
app.use('/', authRoutes);
app.use('/', dashboardRoutes); // Tambahkan rute dashboard
app.use('/', signupRoutes);

// Koneksi ke MongoDB
mongoose.connect('mongodb+srv://konstruksi_app:11bWTyUMH9rTIkZb@konstruksi-app.nbmq9.mongodb.net/?appName=konstruksi-app', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => {
    console.log('Terhubung ke MongoDB');
}).catch((err) => {
    console.log('Gagal terhubung ke MongoDB', err);
});

// Jalankan server
app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});
