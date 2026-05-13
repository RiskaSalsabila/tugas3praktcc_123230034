const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");

router.get("/", noteController.tampilkanSemua);
router.get("/:id", noteController.tampilkanSatu);
router.post("/", noteController.simpanCatatan);
router.put("/:id", noteController.perbaruiCatatan);
router.delete("/:id", noteController.buangCatatan);

module.exports = router;