const userModel = require("../model/user.model");
const { success, failed, successWithToken } = require("../helper/response");

const bcrypt = require("bcrypt");
const jwtToken = require("../helper/generateJWT");

const userController = {
  getUserId: (req, res) => {
    const id_user = req.params.id_user;
    userModel
      .listUserById(id_user)
      .then((result) => {
        success(res, result.rows, "success", "get user success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "get user failed");
      });
  },

  getAllUser: (req, res) => {
    const sort = req.query.sort;
    const asc = req.query.asc;
    const limit = parseInt(req.query.limit) || 3;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    userModel
      .list(sort, asc, limit, offset)
      .then((result) => {
        success(res, result.rows, "success", "success get data");
      })
      .catch((err) => {
        failed(res, err, "failed", "failed get data");
      });
  },
  // getAllUser: (req, res) => {
  //   const limit = parseInt(req.query.limit) || 5;
  //   const page = parseInt(req.query.page) || 1;
  //   const offset = (page - 1) * limit;
  //   userModel
  //     .list(limit, offset)
  //     .then((result) => {
  //       success(res, result.rows, "success", "success get data");
  //     })
  //     .catch((err) => {
  //       failed(res, err, "failed", "failed get data");
  //     });
  // },

  getUserByName: (req, res) => {
    const name = req.params.name;
    userModel
      .listUserByName(name)
      .then((result) => {
        success(res, result.rows, "success", "success get data");
      })
      .catch((err) => {
        failed(res, err, "failed", "failed get data");
      });
  },

  register: (req, res) => {
    try {
      const { name, email, phone, password } = req.body;
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          failed(res, err.message, "failed", "failed hash password");
        }

        const data = {
          name,
          email,
          phone,
          password: hash,
          image: req.file ? req.file.filename : "default.png",
        };

        userModel
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
    userModel
      .checkEmail(email)
      .then((result) => {
        const user = result.rows[0];
        if (result.rowCount > 0) {
          bcrypt
            .compare(password, result.rows[0].password)
            .then(async (result) => {
              if (result) {
                const token = await jwtToken({
                  email: user.email,
                });
                successWithToken(
                  res,
                  {
                    token,
                    data: {
                      id_user: user.id_user,
                      email: user.email,
                      name: user.name,
                      phone: user.phone,
                      image: user.image,
                      job_desk: user.job_desk,
                      title: user.title,
                      city: user.city,
                      skill: user.skill,
                      instagram: user.instagram,
                      github: user.github,
                      gitlab: user.gitlab,
                      portofolio: user.portofolio,
                      description: user.description,
                    },
                  },
                  token,
                  "success",
                  "Success login"
                );
              } else {
                failed(res, null, "failed", "Username or password wrong");
              }
            });
        } else {
          failed(res, null, "failed", "Username or password wrong");
        }
      })
      .catch((err) => {
        failed(res, err.message, "failed", "Internal server error");
      });
  },
  updateUser: (req, res) => {
    const id_user = req.params.id_user;
    const {
      name,
      phone,
      job_desk,
      title,
      city,
      skill,
      instagram,
      github,
      gitlab,
      portofolio,
      description,
    } = req.body;
    const image = req.file ? req.file.filename : "default.png";
    userModel
      .updateUser(
        id_user,
        name,
        phone,
        job_desk,
        title,
        city,
        skill,
        instagram,
        github,
        gitlab,
        portofolio,
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

  deleteUser: (req, res) => {
    const id_user = req.params.id_user;

    userModel
      .deleteUser(id_user)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
  },
};

module.exports = userController;
