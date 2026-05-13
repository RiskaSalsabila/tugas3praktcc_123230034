const Note = require("../schema/Note");

const ambilSemua = async () => {
  return await Note.findAll();
};

const tambahData = async (dataCatatan) => {
  return await Note.create(dataCatatan);
}

const cariSatu = async (id) => {
  return await Note.findByPk(id);
}

const ubahData = async (id, dataCatatan) => {
  return await Note.update(dataCatatan, {
    where: { id: id },
  });
}

const hapusData = async (id) => {
  return await Note.destroy({
    where: { id: id },
  });
}

module.exports = { ambilSemua, tambahData, cariSatu, ubahData, hapusData };