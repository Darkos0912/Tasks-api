const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth.middleware");
const taskController = require("../controllers/task-controller");

router.post("/", authenticateToken, taskController.createTask);
router.get("/", authenticateToken, taskController.getTask);
router.put("/:id", authenticateToken, taskController.updateTask);
router.delete("/:id", authenticateToken, taskController.deleteTask);

module.exports = router;