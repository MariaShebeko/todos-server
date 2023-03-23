const todosOperations = require("../../models/todos/todos");
const todoSchema = require("../../schemas/todos");

const addTodo = async (req, res, next) => {
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
};

module.exports = addTodo;
