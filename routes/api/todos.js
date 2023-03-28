const express = require("express");

const { todos: controller } = require("../../controllers");

const router = express.Router();

router.get("/", controller.getAllTodos);

router.get("/:id", controller.getTodoById);

router.post("/", controller.addTodo);

router.put("/:id", controller.updateTodo);

router.patch("/:id/status", controller.updateStatusTodo);

router.delete("/:id", controller.deleteTodo);

module.exports = router;
