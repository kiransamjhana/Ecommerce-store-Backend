import {
  createAcessJWT,
  verifiyRefreshJWT,
  verifyAccessJWT,
} from "../helpers/jwt.js";

import { getOneUser, getUserByEmail } from "../model/userModel.js";

export const auth = async (req, res, next) => {
  try {
    //get the access JWT from frontedn
    const token = req.headers.authorization;
    console.log("from auth", req.headers);
    // Decode the jwt

    const decoded = verifyAccessJWT(token);
    // extract the email and get user by email
    if (decoded?.email) {
      const user = await getUserByEmail(decoded.email);
      console.log(user);

      if (user?._id && user?.status === "active") {
        user.refreshJWT = undefined;
        user.password = undefined;

        req.userInfo = user;
        return next();
      }
    }
    // check if user is active

    res.status(401).json({
      status: "error",
      message: "unathorized",
    });
  } catch (error) {
    if (error.message.includes("jwt expired")) {
      error.statusCode = 403;
      error.message = error.message;
    }
    if (error.message.includes("invalid signature")) {
      error.statusCode = 401;
      error.message = error.message;
    }
    next(error);
  }
};

export const refreshAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log("from refreshauth", authorization);
    const decoded = verifiyRefreshJWT(authorization);

    //make sure token exist in database
    if (decoded?.email) {
      const user = await getOneUser({
        email: decoded.email,
        refreshJWT: authorization,
      });

      if (user?._id && user?.status === "active") {
        user.refreshJWT = undefined;
        user.password = undefined;
        const accessJWT = await createAcessJWT(decoded.email);

        return res.json({
          status: "success",
          accessJWT,
        });
      }
      req.userInfo = user;
    }
    res.status(401).json({
      status: "error",
      message: "Unauthorized",
    });
  } catch (error) {
    next(error);
  }
};
