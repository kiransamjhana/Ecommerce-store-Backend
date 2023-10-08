import jwt from "jsonwebtoken";

import { updateUser } from "../model/userModel.js";
import { insertNewSession } from "../model/session/sessionModel.js";

export const createAcessJWT = async (email) => {
  console.log("JWT_ACCESS_SECRET:", process.env.JWT_ACCESS_SECRET);
  try {
    const token = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30m",
    });

    console.log("Token before verification:", token); // Log the token

    // Ensure that the token is not undefined before proceeding
    if (!token) {
      throw new Error("Token is undefined");
    }

    // Assuming insertNewSession is correctly defined
    await insertNewSession({ token, associate: email });

    console.log("Token created successfully:", token);

    return token;
  } catch (error) {
    console.error("Error creating access JWT:", error);
    throw new Error("Failed to create access token");
  }
};

export const createRefreshJWT = async (email) => {
  const refreshJWT = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });

  const dt = await updateUser({ email }, { refreshJWT });

  return refreshJWT;
};

export const verifyAccessJWT = (token) => {
  console.log("token before verify", token);
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (error) {
    console.error("Error verifying access JWT:", error);
    throw new Error("Invalid access token");
  }
};
// export const createRefreshJWT = async (email) => {
//   const refreshJWT = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
//     expiresIn: "30d",
//   });

//   const dt = await updateUser({ email }, { refreshJWT });

//   return refreshJWT;
// };

export const verifiyRefreshJWT = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};
