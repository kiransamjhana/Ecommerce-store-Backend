import sessionSchema from "./sessionSchema.js";

export const insertNewSession = (obj) => {
  return sessionSchema(obj).save();
};
//tokken should be string

export const deleteNewSession = async (token) => {
  const dt = await sessionSchema.findOneAndDelete(token);
};

export const deleteSessionByFilter = async (filter) => {
  console.log(filter);
  const dt = await sessionSchema.findOneAndDelete(filter);
  return dt;
};
