const Joi = require("joi");
const categories = require("./categories");

const joiBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required().default("Unknown"),
  numOfPages: Joi.number().min(0),
  synopsis: Joi.string().required(),
  imgUrl: Joi.string().empty(""),
  category: Joi.string(),
}).required();

const joiReviewSchema = Joi.object({
  rating: Joi.number().required().min(1).max(10).default(5),
  comment: Joi.string().required(),
});

module.exports = { joiBookSchema, joiReviewSchema };
