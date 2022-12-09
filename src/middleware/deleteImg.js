const fs = require("fs");
const userModel = require("../model/user.model");
const portofolioModel = require("../model/portfolio.model");
const jobModel = require("../model/job.model");
const recruiterModel = require("../model/recruiter.model");
// const airlineModel = require("../model/portfolio.model");

module.exports = {
	removeProfile: async (req, res, next) => {
		const id_user = req.params.id_user;

		const data = await userModel.listUserById(id_user);
		if(data) {
			console.log(data.rows[0].image);
			if (data.rows[0].image) {
				const img = data.rows[0].image;
				if (img !== "default.png") {
					fs.unlink(`./public/${img}`, (err) => {
						if (err) {
							res.json({
								message: "delete failed",
								error: err,
							});
						}
					});
				}
				next();
			} else {
				res.json("There is no profile picture");
			}
		}else{
			res.json("User ID is not found");
		}
	},

	removeJob: async (req, res, next) => {
		const id_job = req.params.id_job;

		const data = await jobModel.getDetailJob(id_job);
		if(data) {
			console.log(data.rows[0].image);
			if (data.rows[0].image) {
				const img = data.rows[0].image;
				if (img !== "default.png") {
					fs.unlink(`./public/${img}`, (err) => {
						if (err) {
							res.json({
								message: "delete failed",
								error: err,
							});
						}
					});
				}
				next();
			} else {
				res.json("There is no profile picture");
			}
		}else{
			res.json("portofoid_job ID is not found");
		}
	},

	removePortfolio: async (req, res, next) => {
		const id_portofolio = req.params.id_portofolio;

		const data = await portofolioModel.getDetailPorto(id_portofolio);
		if(data) {
			console.log(data.rows[0].image);
			if (data.rows[0].image) {
				const img = data.rows[0].image;
				if (img !== "default.png") {
					fs.unlink(`./public/${img}`, (err) => {
						if (err) {
							res.json({
								message: "delete failed",
								error: err,
							});
						}
					});
				}
				next();
			} else {
				res.json("There is no profile picture");
			}
		}else{
			res.json("portofoid_portofolio ID is not found");
		}
	},
	removeRecruiter: async (req, res, next) => {
		const id_recruiter = req.params.id_recruiter;

		const data = await recruiterModel.listRecruiterById(id_recruiter);
		if(data) {
			if (data.rows[0].image) {
				const img = data.rows[0].image;
				if (img !== "default.png") {
					fs.unlink(`./public/${img}`, (err) => {
						if (err) {
							res.json({
								message: "delete failed",
								error: err,
							});
						}
					});
				}
				next();
			} else {
				res.json("There is no profile picture");
			}
		}else{
			res.json("portofoid_portofolio ID is not found");
		}
	},
};
