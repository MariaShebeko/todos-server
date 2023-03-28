const { Todo } = require("../../models");

const getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const result = await Todo.findOne({ _id: id });
    const result = await Todo.findById(id);

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
};

module.exports = getTodoById;
