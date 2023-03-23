const express = require("express");

const { todos: controller } = require("../../controllers");

const todosOperations = require("../../models/todos/todos");

const router = express.Router();

router.get("/", controller.getAllTodos);

router.get("/:id", controller.getTodoById);

router.post("/", controller.addTodo);

router.put("/:id", controller.updateTodo);

router.delete("/:id", controller.deleteTodo);

module.exports = router;
