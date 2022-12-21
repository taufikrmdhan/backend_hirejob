const jobModel = require("../model/job.model");
const { success, failed } = require("../helper/response");
const cloudinary = require("../helper/cloudinary");

const jobController = {
  // get all
  // insertJob: (req, res) => {
  //   const { job_title, company, date_in, date_out, description } = req.body;

  //   jobModel
  //     .insertJob(job_title, company, date_in, date_out, description, image)
  //     .then((result) => {
  //       success(res, result.rows, "success", "Insert Job Success");
  //     })
  //     .catch((err) => {
  //       failed(res, err.message, "failed", "Failed to insert job");
  //     });
  // },
  insertJob: async (req, res) => {
    try {
      const { job_title, company, date_in, date_out, description } = req.body;
      const image = await cloudinary.uploader.upload(req.file.path);
      console.log(image);
      const data = {
        job_title,
        company,
        date_in,
        date_out,
        description,
        image,
        image_url: image.url,
        image_public_id: image.public_id,
        image_secure_url: image.secure_url,
      };
      console.log(data);
      jobModel
        .insertJob(data)
        .then((result) => {
          res.json({
            message: "success insert data",
            data: result,
          });
        })
        .catch((err) => {
          res.json(err);
        });
      // const result = await recipeModel.insertRecipe(data);
      // success(res, result, 'success', 'Success insert recipe');
    } catch (err) {
      failed(res, err.message, "failed", "Failed insert job");
    }
  },
  list: (req, res) => {
	jobModel
	  .getAllJob()
	  .then((result) => {
		success(res, result.rows, "success", "Get All Job List Success");
	  })
	  .catch((err) => {
		failed(res, err.message, "failed", "Failed to get all job list");
	  });
  },
  detailJob: (req,res) => {
	const id_job = req.params.id_job;
	jobModel
	  .getDetailJob(id_job)
	  .then((result) => {
		success(res, result.rows, "success", "Get Detail Job Success");
	  })
	  .catch((err) => {
		failed(res, err.message, "failed", "Failed to get detail job");
	  });
  },
  destroyJob: (req,res) => {
	const id_job = req.params.id_job;
	jobModel
	  .deleteJob(id_job)
	  .then((result) => {
		success(res, result.rowCount, "success", "Delete Job Success");
	  })
	  .catch((err) => {
		failed(res, err.message, "failed", "Failed to delete job");
	  });
  },
  updateJob: (req,res) => {
	const id_job = req.params.id_job;
	const { job_title, company, date_in, date_out, description } = req.body;
	const image = req.file.filename;
	jobModel
	  .updateJob(id_job, job_title, company, date_in, date_out, description, image)
	  .then((result) => {
		success(res, result.rowCount, "success", "Update Job Success");
	  })
	  .catch((err) => {
		failed(res, err.message, "failed", "Failed to update job");
	  });
  }
  // listAirline: (req, res) => {
  // 	jobModel
  // 		.getAllAirline()
  // 		.then((result) => {
  // 			success(res, result.rows, "success", "Get All Airline List Success");
  // 		})
  // 		.catch((err) => {
  // 			failed(res, err.message, "failed", "Failed to get all airline list");
  // 		});
  // },

  // // get detail
  // detailAirline: (req, res) => {
  // 	const id_airline = req.params.id;

  // 	jobModel
  // 		.getDetailAirline(id_airline)
  // 		.then((result) => {
  // 			success(res, result.rows, "success", "Get Detail Airline Success");
  // 		})
  // 		.catch((err) => {
  // 			failed(res, err.message, "failed", "Failed to get detail airline");
  // 		});
  // },

  // // search airline
  // findAirline: (req, res) => {
  // 	const { limit, sortBy, sortOrd, airlineName } = req.body;
  // 	const page = req.params.page;

  // 	jobModel
  // 		.findAirline(limit, page, sortBy, sortOrd, airlineName)
  // 		.then((result) => {
  // 			success(res, result.rows, "success", "Find Airline Success");
  // 		})
  // 		.catch((err) => {
  // 			failed(res, err.message, "failed", "Failed to find airline");
  // 		});
  // },

  // searchAirline: (req, res) => {
  // 	const name = req.params.name;

  // 	jobModel
  // 		.searchAirline(name)
  // 		.then((result) => {
  // 			success(res, result.rows, "success", "Find Airline Success");
  // 		})
  // 		.catch((err) => {
  // 			failed(res, err.message, "failed", "Failed to find airline");
  // 		});
  // },

  // // insert airline
  // addAirline: (req, res) => {
  // 	try {
  // 		const { name } = req.body;
  // 		const logo = req.file.filename;

  // 		const data = {
  // 			name,
  // 			logo,
  // 		};

  // 		jobModel
  // 			.addAirline(data)
  // 			.then((result) => {
  // 				success(res, result.rowCount, "success", "Insert Airline Success");
  // 			})
  // 			.catch((err) => {
  // 				failed(res, err.message, "failed", "Failed to insert airline");
  // 			});
  // 	} catch (err) {
  // 		console.error(err);
  // 	}
  // },

  // // update airline
  // updateAirline: (req, res) => {
  // 	const id_airline = req.params.id;
  // 	const { name } = req.body;

  // 	jobModel
  // 		.updateAirline(id_airline, name)
  // 		.then((result) => {
  // 			success(res, result.rowCount, "success", "Update Airline Success");
  // 		})
  // 		.catch((err) => {
  // 			failed(res, err.message, "failed", "Failed to update airline");
  // 		});
  // },

  // // update logo
  // updateLogo: (req, res) => {
  // 	const id_airline = req.params.id;
  // 	const logo = req.file.filename;

  // 	const data = {
  // 		id_airline,
  // 		logo,
  // 	};

  // 	jobModel
  // 		.updateLogo(data)
  // 		.then((result) => {
  // 			success(res, result.rowCount, "success", "Update Logo Success");
  // 		})
  // 		.catch((err) => {
  // 			failed(res, err.message, "failed", "Failed to update logo");
  // 		});
  // },

  // // delete airline
  // deleteAirline: (req, res) => {
  // 	const id_airline = req.params.id;

  // 	jobModel
  // 		.deleteAirline(id_airline)
  // 		.then((result) => {
  // 			success(res, result.rowCount, "success", "Delete airline Success");
  // 		})
  // 		.catch((err) => {
  // 			failed(res, err.message, "failed", "Failed to delete airline");
  // 		});
  // },
};

module.exports = jobController;
