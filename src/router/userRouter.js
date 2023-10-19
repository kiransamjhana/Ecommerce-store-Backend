import express from "express";
import {
  getUserByEmail,
  getUsers,
  insertUser,
  updateUser,
} from "../model/userModel.js";
import {
  loginValidation,
  newUserValidation,
  newUserValidationVerification,
} from "../middleaware/joyvalidation.js";
import { compairPassword, hashPassword } from "../helpers/bycrypt.js";
import {
  accountVerificationEmail,
  accountVerifiedNotification,
} from "../helpers/nodemailer.js";
import { auth, refreshAuth } from "../middleaware/authMiddleware.js";
import { v4 as uuidv4 } from "uuid";
import { createAcessJWT, createRefreshJWT } from "../helpers/jwt.js";
const router = express.Router();

//get admin details
router.get("/", async (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "Here are the user INfo",
      user: req.userInfo,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/get-users", auth, async (req, res, next) => {
  try {
    const user = await getUsers();

    res.json({
      status: "success",
      message: "Here are the user INfo",
      user,
    });
  } catch (error) {
    next(error);
  }
});

//post user
router.post("/", newUserValidation, async (req, res, next) => {
  try {
    const { password } = req.body;
    req.body.password = hashPassword(password);

    //TODO create code and add with req.body
    req.body.verificationCode = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

    const result = await insertUser(req.body);

    if (result?._id) {
      res.json({
        status: "success",
        message:
          "Please check your email and follow the instruction to activate your acount",
      });

      const link = ` ${process.env.WEB_DOMAIN}/user-verification?c=${result.verificationCode}&e=${result.email}`;

      await accountVerificationEmail({
        fName: result.fName,
        email: result.email,
        link,
      });
      return;
    }

    res.json({
      status: "error",
      message: "Unable to add new admin, Please try agian later",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      error.statusCode = 400;
      error.message =
        "This email is already used by another Admin, Use different email or reset your password";
    }

    next(error);
  }
});

//admin verification
router.post(
  "/user-verification",

  newUserValidationVerification,
  async (req, res, next) => {
    try {
      const { e, c } = req.body;
      const filter = {
        email: e,
        verificationCode: c,
      };
      const updateObj = {
        status: "active",
        verificationCode: "",
        isVerified: "true",
      };
      const result = await updateUser(filter, updateObj);

      if (result?._id) {
        await accountVerifiedNotification(result);
        res.json({
          status: "success",
          message:
            " Your account has been verified, please proceeed to login and your are welcome",
        });
        return;
      }
      res.json({
        status: "error",
        message: "Link is expired or invalid",
      });
    } catch (error) {
      next(error);
    }
  }
);

//login user
router.post("/login", loginValidation, async (req, res, next) => {
  //CRERATE ACCESS JWT AND STORE IN SESSION TABLE: SHORT LIVE 15M
  // CREATE REFERESE JWT AND STORE  WITH USER DATA IN USER TABLE : LONG LIVE 30DAYS
  //RETURN THE JWTS

  try {
    const { email, password } = req.body;
    //FIND THE USER BY EMAIL
    const user = await getUserByEmail(email);
    console.log(user);
    //CHECK THE PASSWORD MATCH
    if (user?._id) {
      const isMatch = compairPassword(password, user.password);

      if (isMatch) {
        //CREATE 2 JWTS
        const accessJWT = await createAcessJWT(email);
        const refreshJWT = await createRefreshJWT(email);
        return res.json({
          status: "success",
          message: "Logedin successfully",
          token: { accessJWT, refreshJWT },
        });
      }
    }
    //return the jwt
    res.json({
      status: "error",
      message: "Invalid Login details,,,,try again",
    });
  } catch (error) {
    next(error);
  }
});

//return the refreshJWT
router.get("/get-accessjwt", refreshAuth);

export default router;
