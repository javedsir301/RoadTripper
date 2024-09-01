const express = require("express");
const router = express.Router();
const busController = require("../controllers/busController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, busController.addBus);
router.get("/", authMiddleware, busController.getAllBuses);
router.get("/:bus_id", authMiddleware, busController.getBus);
router.put("/:bus_id", authMiddleware, busController.updateBus);
router.delete("/:bus_id", authMiddleware, busController.deleteBus);

module.exports = router;
