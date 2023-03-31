const express = require("express");

//controllers
const { signUp } = require("../../controllers/auth/sign-up");
const { signIn } = require("../../controllers/auth/sign-in");
const { signupValid, signinValid } = require("../../validation/user/auth");

const {
    resizeUserImage,
    uploadSingleImage,
} = require("../../middlewares/upload-img/upload-img");

const authRouter = express.Router();

authRouter.post("/sign-up", uploadSingleImage("photo"), resizeUserImage, signupValid, signUp);
authRouter.post("/sign-in", signinValid, signIn);

module.exports = authRouter;
