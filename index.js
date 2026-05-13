// Import Package dan File
const express = require("express");
const sequelize = require("./config/database");
const noteRoutes = require("./routes/noteRoutes"); 

// Inisialisasi Express dan Cors
const app = express();
const cors = require("cors");

app.use(cors()); // Izinkan semua origin

// Middleware untuk parsing JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World! API Notes Ready.");
});

require("./schema/Note"); 
app.use("/api/v1/notes", noteRoutes); 

const port = process.env.PORT || 3000;

// 1. Jalankan server DULU biar Cloud Run sukses (nggak timeout)
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});

// 2. Baru coba sinkronisasi database (kalau error, bakal kelihatan di log)
sequelize.sync()
  .then(() => {
    console.log("Database berhasil di-sync!");
  })
  .catch((err) => {
    console.error("GAGAL KONEK DATABASE:", err.message);
  });