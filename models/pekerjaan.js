const mongoose = require('mongoose');

const pekerjaanSchema = new mongoose.Schema({
    nama_kategori: String,
    deskripsi: String,
    subpekerjaan: [
        {
            nama_subpekerjaan: String,
            bahan: [
                {
                    bahan_id: String,
                    volume: Number
                }
            ],
            tenaga: [
                {
                    tenaga_id: String,
                    jumlah: Number
                }
            ]
        }
    ]
});

module.exports = mongoose.model('Pekerjaan', pekerjaanSchema);
