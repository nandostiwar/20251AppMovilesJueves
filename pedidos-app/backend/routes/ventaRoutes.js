const express = require("express");
const { crearVenta, obtenerVentas } = require("../controllers/ventaController");

const router = express.Router();

router.post("/", crearVenta);
router.get("/", obtenerVentas);

module.exports = router;
