const { Todo } = require("../../models");

const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Todo.findByIdAndRemove(id);

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
};

module.exports = deleteTodo;
