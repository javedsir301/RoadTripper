const express = require("express");
const router = express.Router();
const routeController = require("../controllers/routeController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, routeController.addRoute);
router.get("/", authMiddleware, routeController.getAllRoutes);
router.get("/:route_id", authMiddleware, routeController.getRoute);
router.put("/:route_id", authMiddleware, routeController.updateRoute);
router.delete("/:route_id", authMiddleware, routeController.deleteRoute);

module.exports = router;
