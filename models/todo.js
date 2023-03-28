const { boolean } = require("joi");
const { Schema, model } = require("mongoose");
const Joi = require("joi");

const todoSchema = Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 2,
    },
    description: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiTodoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  isCompleted: Joi.bool(),
});

const joiStatusTodoSchema = Joi.object({
  isCompleted: Joi.bool().required(),
});

const Todo = model("todo", todoSchema);

module.exports = {
  Todo,
  joiTodoSchema,
  joiStatusTodoSchema,
};
