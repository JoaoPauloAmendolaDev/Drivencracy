import joi from "joi";

export const opcoesDeVotos = joi.object({
    _id: joi.string(),
    title: joi.string(),
    poolId: joi.string()
})