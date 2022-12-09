const express = require("express");

const {
  register,
  login,
  getAllRecruiter,
  getRecruiterId,
  deleteRecruiter,
  updateRecruiter,
  getRecruiterByName
} = require("../controller/recruiter.controller");
const { upload } = require("../middleware/uploadImg");
const { removeRecruiter } = require("../middleware/deleteImg");
const jwtAuth = require("../middleware/jwtAuth");
const { isAdmin } = require("../middleware/auth");

const recruiterRouter = express.Router();

recruiterRouter
.get('/recruiter/list', getAllRecruiter)
.get('/recruiter/list/:id_recruiter', getRecruiterId)
.get('/recruiter/list/name/:company_name', getRecruiterByName)
// .post('/user/add', insert)
// .put('/user/update/:id_user', deleted.remove, upload, update)
// .put('/user/update/:email', updateByEmail)
// // .delete('/user/delete/:id_user', destroy)
.put("/recruiter/update/:id_recruiter", removeRecruiter, upload, updateRecruiter)
.delete('/recruiter/delete/:id_recruiter',jwtAuth, isAdmin, removeRecruiter, deleteRecruiter)

.post('/recruiter/register', register)
.post('/recruiter/login', login);

module.exports = recruiterRouter;
