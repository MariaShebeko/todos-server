const todosOperations = require("../../models/todos/todos");
const todoSchema = require("../../schemas/todos");

const updateTodo = async (req, res, next) => {
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
};

module.exports = updateTodo;
