import express from "express";
import controller from "../controllers/publicacion.js";

var router = express.Router();

router.post("/save", controller.save);
router.get("/publicaciones", controller.getPublicaciones);
router.put("/publicaciones/:id", controller.updateLikes); // 🔹 Nueva ruta para actualizar likes

export default router;
