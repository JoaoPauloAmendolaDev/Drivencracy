import joi from "joi";

export const votosSchema = joi.object({
  _id: joi.string(),
  createdAt: joi.string(),
  choiceId: joi.string(),
});
