import userSchema from "../schema/userSchema.js";

export const insertUser = (obj) => {
  return userSchema(obj).save();
};
export const getUserById = (_id) => {
  return userSchema.findById(_id);
};
export const getUserByEmail = (email) => {
  return userSchema.findOne({ email });
};
export const getOneUser = (filter) => {
  return userSchema.findOne(filter);
};

export const getUsers = () => {
  return userSchema.find();
};

export const updateUserById = ({ _id, ...rest }) => {
  return userSchema.findByIdAndUpdate(_id, rest);
}; //afilter
export const updateUser = (filter, updateObj) => {
  return userSchema.findOneAndUpdate(filter, updateObj, { new: true });
};
export const deleteUserById = (_id) => {
  return userSchema.findByIdAndDelete(_id);
};
