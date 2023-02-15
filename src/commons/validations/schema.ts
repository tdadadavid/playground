import Joi from "joi";

export const removeAudioSchema = Joi.object().keys({
  file: Joi.required(),
});

export const removeVideoSchema = Joi.object().keys({
  file: Joi.required(),
})

export const getMetaDataSchema = Joi.object().keys({
  file: Joi.optional(),
});

export const addNewAudioSchema = Joi.object().keys({
  file: Joi.required(),
  audio: Joi.required()
});
