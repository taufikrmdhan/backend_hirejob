const recruiterModel = require("../model/recruiter.model");
const { success, failed, successWithToken } = require("../helper/response");

const bcrypt = require("bcrypt");
const jwtToken = require("../helper/generateJWT");

const recruiterController = {
  getRecruiterId: (req, res) => {
    const id_recruiter = req.params.id_recruiter;
    recruiterModel
      .listRecruiterById(id_recruiter)
      .then((result) => {
        success(res, result.rows, "success", "get user success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "get user failed");
      });
  },

  getAllRecruiter: (req, res) => {
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;
    recruiterModel
      .list(limit, offset)
      .then((result) => {
        success(res, result.rows, "success", "success get data");
      })
      .catch((err) => {
        failed(res, err, "failed", "failed get data");
      });
  },

  getRecruiterByName: (req, res) => {
    const company_name = req.params.company_name;
    recruiterModel
      .listRecruiterByName(company_name)
      .then((result) => {
        success(res, result.rows, "success", "success get data");
      })
      .catch((err) => {
        failed(res, err, "failed", "failed get data");
      });
  },

  //   getUserByName: (req, res) => {
  //     const name = req.params.name;
  //     recruiterModel
  //       .listUserByName(name)
  //       .then((result) => {
  //         success(res, result.rows, "success", "success get data");
  //       })
  //       .catch((err) => {
  //         failed(res, err, "failed", "failed get data");
  //       });
  //   },

  register: (req, res) => {
    try {
      const { full_name, email, company_name, department, phone, password } =
        req.body;
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          failed(res, err.message, "failed", "failed hash password");
        }

        const data = {
          full_name,
          email,
          company_name,
          department,
          phone,
          password: hash,
          level: 0,
          image: req.file ? req.file.filename : "default.png",
        };

        recruiterModel
          .register(data)
          .then((result) => {
            success(res, result, "success", "Success register");
          })
          .catch((err) => {
            failed(res, err.message, "failed", "Failed register");
          });
      });
    } catch (err) {
      failed(res, err.message, "failed", "internal server error");
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    recruiterModel
      .checkEmail(email)
      .then((result) => {
        const recruiter = result.rows[0];
        if (result.rowCount > 0) {
          bcrypt
            .compare(password, result.rows[0].password)
            .then(async (result) => {
              if (result) {
                const token = await jwtToken({
                  email: recruiter.email,
                  level: recruiter.level,
                });
                successWithToken(
                  res,
                  {
                    token,
                    data: {
                      id_recruiter: recruiter.id_recruiter,
                      email: recruiter.email,
                      full_name: recruiter.full_name,
                      company_name: recruiter.company_name,
                      department: recruiter.department,
                      phone: recruiter.phone,
                      business: recruiter.business,
                      city: recruiter.city,
                      linkedin: recruiter.linkedin,
                      instagram: recruiter.instagram,
                      image: recruiter.image,
                      description: recruiter.description,
                      level: recruiter.level,
                    },
                  },
                  token,
                  "success",
                  "Success login"
                );
              } else {
                failed(res, null, "failed", "recruitername or password wrong");
              }
            });
        } else {
          failed(res, null, "failed", "recruitername or password wrong");
        }
      })
      .catch((err) => {
        failed(res, err.message, "failed", "Internal server error");
      });
  },
  updateRecruiter: (req, res) => {
    const id_recruiter = req.params.id_recruiter;
    const {
      full_name,
      email,
      company_name,
      department,
      phone,
      business,
      city,
      linkedin,
      instagram,
      description,
    } = req.body;
    const image = req.file ? req.file.filename : "default.png";
    recruiterModel
      .updateRecruiter(
        id_recruiter,
        full_name,
        email,
        company_name,
        department,
        phone,
        business,
        city,
        linkedin,
        instagram,
        image,
        description
      )
      .then((result) => {
        success(res, result.rowCount, "success", "success update user");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "failed update user");
      });
  },

  deleteRecruiter: (req, res) => {
    const id_recruiter = req.params.id_recruiter;

    recruiterModel
      .deleteRecruiter(id_recruiter)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
  },
};

module.exports = recruiterController;
