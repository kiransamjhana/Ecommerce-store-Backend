import orderSchema from "../schema/orderSchema.js";

export const insertOrder = (obj) => {
  return orderSchema(obj).save();
};
export const getOrderById = (_id) => {
  return orderSchema.findById(_id);
};
export const getOrderByEmail = (email) => {
  return orderSchema.findOne({ email });
};
export const getOneOrder = (filter) => {
  return orderSchema.findOne(filter);
};

export const getOrders = () => {
  return orderSchema.find();
};

export const updateOrderById = ({ _id, ...rest }) => {
  return orderSchema.findByIdAndUpdate(_id, rest);
}; //afilter
export const updateOrder = (filter, updateObj) => {
  return orderSchema.findOneAndUpdate(filter, updateObj, { new: true });
};
export const deleteOrderById = (_id) => {
  return orderSchema.findByIdAndDelete(_id);
};
