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

export const updateAdminById = ({ _id, ...rest }) => {
  return adminSchema.findByIdAndUpdate(_id, rest);
}; //afilter
export const updateAdmin = (filter, updateObj) => {
  return adminSchema.findOneAndUpdate(filter, updateObj, { new: true });
};
export const deleteAdminById = (_id) => {
  return adminSchema.findByIdAndDelete(_id);
};
