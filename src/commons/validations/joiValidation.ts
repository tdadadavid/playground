import {Schema} from "joi";

export const validateReq = (schema: Schema, object: Record<any, unknown>) => {
  const { error, value } = schema.validate(object);
  if (error){
    throw error
  }

  return;
}
