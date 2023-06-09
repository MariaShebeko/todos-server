const { Todo } = require("../../models");
const { joiTodoSchema } = require("../../models/todo");

const updateTodo = async (req, res, next) => {
  try {
    const { error } = joiTodoSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const { id } = req.params;
    const result = await Todo.findByIdAndUpdate(id, req.body, { new: true });

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
