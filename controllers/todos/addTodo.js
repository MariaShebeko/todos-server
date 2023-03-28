const { Todo } = require("../../models");
const { joiTodoSchema } = require("../../models/todo");

const addTodo = async (req, res, next) => {
  try {
    const { error } = joiTodoSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const result = await Todo.create(req.body);
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
