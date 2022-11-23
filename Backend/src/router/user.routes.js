const express = require("express");

const {
  getAllUser,
  updateUser,
  deleteUser,
  getUserByName,
  //   listUserById,
  //   insert,
  //   updateByEmail,
  getUserId,
  register,
  login,
} = require("../controller/user.controller");
const { upload } = require("../middleware/uploadImg");
const { removeProfile } = require("../middleware/deleteImg");
// const jwtAuth = require("../middleware/jwtAuth");
// const { isAdmin } = require("../middleware/auth");

const userRouter = express.Router();

userRouter
  // .get('/user/list', jwtAuth, isAdmin, list)
  .get("/user/list/", getAllUser)
  .get("/user/list/:id_user", getUserId)
  .get("/user/list/name/:name", getUserByName)

  .put("/user/update/:id_user", removeProfile, upload, updateUser)
  .delete("/user/delete/:id_user", removeProfile, deleteUser)

  .post("/user/register", register)
  .post("/user/login", login);

module.exports = userRouter;
