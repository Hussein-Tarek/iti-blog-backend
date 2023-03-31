const { uploadCloud } = require("../../middlewares/cloudinary/cloudinary");
const { uploadCloudBB } = require("../../middlewares/imgbb/imgbb");
const { postModel } = require("../../models");
const { successHandler } = require("../../utils/responseHandler");

exports.createPost = async (req, res, next) => {
  try {
    let post = { ...req.body, user: req.userID };

    console.log("photo", req.file.photo)
    if (req.file?.photo) {
      console.log("photo", req.file.photo)
      post.photo = await uploadCloudBB(req.file.photo);
    }

    createdPost = new postModel(post);
    await postModel.create(createdPost);

    successHandler(res, createdPost);
  } catch (err) {
    next(err);
  }
}