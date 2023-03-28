const { Todo } = require("../../models");

const getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({});
    res.json({
      status: "sucess",
      code: 200,
      data: {
        result: todos,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllTodos;
