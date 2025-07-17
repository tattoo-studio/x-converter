// server.js

// Impor library yang dibutuhkan
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Untuk mengizinkan koneksi dari frontend

const app = express();
const PORT = 3000; // Port untuk server backend

// Middleware
app.use(cors()); // Mengizinkan semua permintaan cross-origin
app.use(express.json()); // Untuk membaca body JSON dari request

// Fungsi untuk mendapatkan API key acak dari file
function getRandomApiKey() {
    try {
        const filePath = path.join(__dirname, 'gemini.txt');
        const keys = fs.readFileSync(filePath, 'utf-8').split('\n').filter(key => key.trim() !== '');
        if (keys.length === 0) {
            throw new Error("gemini.txt is empty or not found.");
        }
        const randomIndex = Math.floor(Math.random() * keys.length);
        return keys[randomIndex];
    } catch (error) {
        console.error("Failed to read API keys:", error);
        return null;
    }
}

// Endpoint API yang akan dipanggil oleh frontend
app.post('/api/generate-post', async (req, res) => {
    const { link } = req.body; // Mengambil link dari request frontend

    if (!link) {
        return res.status(400).json({ error: 'Link is required' });
    }

    // 1. Dapatkan API key secara acak
    const apiKey = getRandomApiKey();
    if (!apiKey) {
        return res.status(500).json({ error: 'Could not retrieve an API key.' });
    }
    console.log(`Using a random API key: ...${apiKey.slice(-4)}`);

    // 2. (SIMULASI) Scraping & Panggilan Gemini
    // Di sini Anda akan menambahkan logika nyata untuk scraping dan memanggil Gemini API
    // menggunakan 'apiKey' yang sudah didapatkan.

    // Contoh data simulasi
    const trends = ['#AITechnology', 'FutureIsNow', '#DataScience', 'Innovation'];
    const postContent = `This article about ${link} perfectly captures the essence of #AITechnology. A deep dive into how innovation is shaping our world. Truly, the #FutureIsNow.`;
    const finalOutput = `${postContent}\n\n${link}\n\n${trends.join(' ')}`;
    
    // 3. Kirim hasil kembali ke frontend
    res.json({ generatedPost: finalOutput });
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});
