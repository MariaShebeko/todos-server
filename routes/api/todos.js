const express = require("express");
const Joi = require("joi");

const todoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  isCompleted: Joi.boolean().required(),
});

const todosOperations = require("../../models/todos/todos");

const router = express.Router();

// GET /api/todos
router.get("/", async (req, res, next) => {
  try {
    const todos = await todosOperations.getAllTodos();
    res.json({
      status: "sucess",
      code: 200,
      data: {
        result: todos,
      },
    });
  } catch (error) {
    // send error to index.js for middleware which handles errors
    next(error);
    // not necessary to write it, because of middleware in indes.js (next will send the error)
    // res.status(500).json({
    //   status: "error",
    //   code: 500,
    //   message: "Server error",
    // });
  }
});

// GET /api/todos/id
router.get("/:id", async (req, res, next) => {
  // req.params save all dynamical parts of the route
  console.log("req.params", req.params);

  try {
    const { id } = req.params;
    const result = await todosOperations.getTodoById(id);

    if (!result) {
      const error = new Error(`Todo with id=${id} not found`);
      error.status = 404;
      throw error;
    }

    res.json({
      status: "sucess",
      code: 200,
      data: {
        result: result,
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/todos
router.post("/", async (req, res, next) => {
  try {
    const { error } = todoSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const result = await todosOperations.addTodo(req.body);
    res.status(201).json({
      status: "sucess",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

// UPDATE /api/todos/id
router.put("/:id", async (req, res, next) => {
  try {
    const { error } = todoSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const { id } = req.params;
    const result = await todosOperations.updateTodo(id, req.body);

    if (!result) {
      const error = new Error(`Todo with id=${id} not found`);
      error.status = 404;
      throw error;
    }

    res.json({
      status: "sucess",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/todos/id
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await todosOperations.deleteTodo(id);

    if (!result) {
      const error = new Error(`Todo with id=${id} not found`);
      error.status = 404;
      throw error;
    }

    res.json({
      status: "sucess",
      code: 200,
      message: "Todo deleted",
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
