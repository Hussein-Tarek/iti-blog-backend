const express = require("express");

//controllers
const { signUp } = require("../../controllers/auth/sign-up");
const { signIn } = require("../../controllers/auth/sign-in");
const { signupValid, signinValid } = require("../../validation/user/auth");

const {
    resizeUserImage,
    uploadSingleImage,
    uploadMultiImages,
} = require("../../middlewares/upload-img/upload-img");

const authRouter = express.Router();

authRouter.post("/sign-up", uploadMultiImages([
    { name: "photo", maxCount: 1 },
    { name: "cover_photo", maxCount: 1 },
]), resizeUserImage, signupValid, signUp);
authRouter.post("/sign-in", signinValid, signIn);

module.exports = authRouter;
