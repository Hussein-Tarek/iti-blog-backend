const { userModel } = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");
const { hashPassword, signUserToken } = require("./auth");
const { uploadCloudBB } = require("../../middlewares/imgbb/imgbb");

exports.signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    let user = { ...req.body }
    // check if user exist
    const checkedUser = await userModel.findOne({ email });
    if (checkedUser) {
      throw errorHandler(
        "email is already exist try different email or sign in",
        400
      );
    }
    console.log("out photo", req.file)
    if (req.file?.photo) {
      console.log("photo", req.file.photo)
      user.photo = await uploadCloudBB(req.file.photo);
    }
    // hash password
    const pass = await hashPassword(password);

    // create new user
    user = { ...user, password: pass }
    createUser = new userModel(user);
    await userModel.create(createUser);
    // await userModel.create({ ...req.body, password: pass });

    //get the user
    const newUser = await userModel.findOne({ email });

    //add access token
    const access_token = await signUserToken(newUser.id);

    // handle response
    successHandler(res, {
      access_token,
      user: newUser,
    });
  } catch (err) {
    next(err);
  }
};