const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const todosPath = path.join(__dirname, "./todos.json");

const getAllTodos = async () => {
  const todos = JSON.parse(await fs.readFile(todosPath));
  return todos;
};

const getTodoById = async (id) => {
  const todos = await getAllTodos();
  const todo = await todos.find((todo) => {
    return todo.id === id;
  });
  if (!todo) {
    return null;
  }
  return todo;
};

const deleteTodo = async (id) => {
  const todos = await getAllTodos();
  const idx = todos.findIndex((todo) => todo.id === id);
  if (idx === -1) {
    return null;
  }
  const newTodosList = todos.filter((_, index) => index !== idx);
  await fs.writeFile(todosPath, JSON.stringify(newTodosList));
  return todos[idx];
};

const addTodo = async (body) => {
  const todos = await getAllTodos();
  const newTodo = { ...body, id: v4() };
  todos.push(newTodo);
  await fs.writeFile(todosPath, JSON.stringify(todos));
  return newTodo;
};

const updateTodo = async (id, body) => {
  const todos = await getAllTodos();
  const idx = todos.findIndex((todo) => todo.id === id);
  if (idx === -1) {
    return null;
  }
  todos[idx] = { ...body, id };
  await fs.writeFile(todosPath, JSON.stringify(todos));
  return todos[idx];
};

module.exports = {
  getAllTodos,
  getTodoById,
  deleteTodo,
  addTodo,
  updateTodo,
};
