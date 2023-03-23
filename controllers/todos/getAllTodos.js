const todosOperations = require("../../models/todos/todos");

const getAllTodos = async (req, res, next) => {
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
    next(error);
  }
};

module.exports = getAllTodos;
