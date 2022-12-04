import joi from "joi";

export const enqueteSchema = joi.object({
    _id: joi.string(),
    title: joi.string(),
    expireAt: joi.string()
})