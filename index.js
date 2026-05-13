const express = require("express");
const cors = require("cors");
const noteRoutes = require("./routes/noteRoutes");

// Panggil koneksi database
const sequelize = require("./config/database"); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route test
app.get("/", (req, res) => {
  res.send("Backend API berhasil jalaan ");
});

// Routes utama
app.use("/api/v1/notes", noteRoutes);

const PORT = process.env.PORT || 8080;

// 2. Mantra Sequelize untuk auto-create tabel sebelum server nyala
sequelize.sync()
  .then(() => {
    console.log("Database & Tabel berhasil disinkronisasi!");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Gagal sinkronisasi database:", err);
  });