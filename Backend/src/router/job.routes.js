const express = require("express");
const {
	  list,
	  insertJob,
	  detailJob,
	  destroyJob,
	  updateJob,
} = require("../controller/job.controller");

const router = express.Router();

const jwtAuth = require("../middleware/jwtAuth");
const { isAdmin, isCustomer } = require("../middleware/auth");
const { upload } = require("../middleware/uploadImg");
const { removeJob } = require("../middleware/deleteImg");

router
	.get("/job", list)
	.get("/job/:id_job", detailJob)
	// .post("/flight/find/:page", find)
	.post("/job/add", upload, insertJob)
  
	.put("/job/update/:id_job",removeJob,upload, updateJob)
	.delete("/job/delete/:id_job", removeJob, destroyJob);

module.exports = router;
