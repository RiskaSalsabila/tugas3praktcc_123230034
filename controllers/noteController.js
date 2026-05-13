const noteModel = require("../models/noteModels");

const tampilkanSemua = async (req, res) => {
  try {
    const dataCatatan = await noteModel.ambilSemua();
    res.status(200).json({
      sukses: true,
      pesan: "Berhasil mengambil daftar catatan",
      payload: dataCatatan,
    });
  } catch (error) {
    res.status(500).json({
      sukses: false,
      pesan: "Gagal mengambil data dari server",
      error: error.message,
    });
  }
};

const simpanCatatan = async (req, res) => {
  const { judul, isi } = req.body;

  try {
    const catatanBaru = await noteModel.tambahData({ judul, isi });
    res.status(201).json({
      sukses: true,
      pesan: "Catatan baru berhasil ditambahkan",
      payload: catatanBaru,
    });
  } catch (error) {
    res.status(400).json({
      sukses: false,
      pesan: "Data tidak valid atau gagal disimpan",
      error: error.message,
    });
  }
};

const tampilkanSatu = async (req, res) => {
  const { id } = req.params;

  try {
    const catatan = await noteModel.cariSatu(id);

    if (!catatan) {
      return res.status(404).json({
        sukses: false,
        pesan: "Catatan tidak ditemukan",
      });
    }

    res.status(200).json({
      sukses: true,
      pesan: "Detail catatan berhasil diambil",
      payload: catatan,
    });

  } catch (error) {
    res.status(500).json({
      sukses: false,
      pesan: "Terjadi kesalahan saat mencari catatan",
      error: error.message,
    });
  }
};

const perbaruiCatatan = async (req, res) => {
  const { id } = req.params;
  const { judul, isi } = req.body;

  try {
    const catatan = await noteModel.cariSatu(id);

    if (!catatan) {
      return res.status(404).json({
        sukses: false,
        pesan: "Catatan yang ingin diubah tidak ada",
      });
    }

    const catatanDiperbarui = await noteModel.ubahData(id, { judul, isi });
    res.status(200).json({
      sukses: true,
      pesan: "Catatan berhasil diperbarui",
      payload: catatanDiperbarui,
    });
  } catch (error) {
    res.status(500).json({
      sukses: false,
      pesan: "Gagal memperbarui catatan",
      error: error.message,
    });
  }
};

const buangCatatan = async (req, res) => {
  const { id } = req.params;

  try {
    const catatan = await noteModel.cariSatu(id);
    if (!catatan) {
      return res.status(404).json({
        sukses: false,
        pesan: "Catatan yang ingin dihapus tidak ditemukan",
      });
    }

    const catatanDihapus = await noteModel.hapusData(id);
    res.status(200).json({
      sukses: true,
      pesan: "Catatan berhasil dihapus permanen",
      payload: catatanDihapus,
    });
  } catch (error) {
    res.status(500).json({
      sukses: false,
      pesan: "Terjadi kesalahan saat menghapus data",
      error: error.message,
    });
  }
};

module.exports = {
  tampilkanSemua,
  simpanCatatan,
  tampilkanSatu,
  perbaruiCatatan,
  buangCatatan,
};