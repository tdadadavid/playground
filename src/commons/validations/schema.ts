import Joi, {ObjectSchema} from "joi";

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

// extract to its own field..
type ExtractAudioSchema = {
  file: any,
  body: {
    start: string,
    end: string
  }
}
export const extractAudioSchema: ObjectSchema<ExtractAudioSchema> = Joi.object().keys({
  file: Joi.required(),
  body: Joi.object().keys({
    start: Joi.string().required(),
    end: Joi.string().required(),
  })
})
