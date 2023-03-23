const Joi = require("joi");

const todoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  isCompleted: Joi.boolean().required(),
});

module.exports = todoSchema;
