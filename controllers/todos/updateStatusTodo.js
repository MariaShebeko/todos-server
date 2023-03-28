const { Todo } = require("../../models");
const { joiStatusTodoSchema } = require("../../models/todo");

const updateStatusTodo = async (req, res, next) => {
  try {
    const { error } = joiStatusTodoSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const { id } = req.params;
    const { isCompleted } = req.body;
    const result = await Todo.findByIdAndUpdate(
      id,
      { isCompleted },
      { new: true }
    );

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

module.exports = updateStatusTodo;
