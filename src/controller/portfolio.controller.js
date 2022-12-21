const portofolioModel = require("../model/portfolio.model");
const { success, failed } = require("../helper/response");
const cloudinary = require("../helper/cloudinary");

const portofolioController = {
  // insertPortofolio: (req, res) => {
  //   const { title, link, id_user } = req.body;
  //   const image = req.file.filename;
  //   portofolioModel
  //     .insertPortofolio(title, image, link, id_user)
  //     .then((result) => {
  //       res.json({
  //         message: "success insert data",
  //         data: result,
  //       });
  //     })
  //     .catch((err) => {
  //       res.json(err);
  // //     });
  // // },
  // insertPortofolio: (req, res) => {
  //   const { title, link } = req.body;
  //   const image = req.file.filename;
  //   portofolioModel
  //     .insertPortofolio(title, image, link)
  //     .then((result) => {
  //       res.json({
  //         message: "success insert data",
  //         data: result,
  //       });
  //     })
  //     .catch((err) => {
  //       res.json(err);
  //     });
  // },
  insertPortofolio: async (req, res) => {
    try {
      const { title, link } = req.body;
      const image = await cloudinary.uploader.upload(req.file.path);
      console.log(image);
      const data = {
        title,
        link,
        image,
        image_url: image.url,
        image_public_id: image.public_id,
        image_secure_url: image.secure_url,
      };
      console.log('ini controller',data);
      portofolioModel
        .insertPortofolio(data)
        .then((result) => {
          // res.json({
          //   message: "success insert data",
          //   data: result,
          // });
          success(res, result, "success", "Insert portofolio Success");
        })
        .catch((err) => {
          // res.json(err);
          failed(res, err.message, "failed", "Failed insert portofolio 1");
        });
      // const result = await recipeModel.insertRecipe(data);
      // success(res, result, 'success', 'Success insert recipe');
    } catch (err) {
      failed(res, err.message, "failed", "Failed insert portoflio");
    }
  },
  list: (req, res) => {
    const id_user = req.params.id_user;
    portofolioModel
      .getAllPortofolio(id_user)
      .then((result) => {
        success(res, result.rows, "success", "Get All Flight List Success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "Failed to get all flight list");
      });
  },
  listAll: (req, res) => {
    portofolioModel
      .getAllPortofolioAll()
      .then((result) => {
        success(res, result.rows, "success", "Get All Flight List Success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "Failed to get all flight list");
      });
  },
  destroy: (req, res) => {
    const id_portofolio = req.params.id_portofolio;

    portofolioModel
      .deletePortofolio(id_portofolio)
      .then((result) => {
        success(res, result.rowCount, "success", "Delete Flight Success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "Failed to delete flight");
      });
  },
  detail: (req, res) => {
    const id_portofolio = req.params.id_portofolio;

    portofolioModel
      .getDetailPorto(id_portofolio)
      .then((result) => {
        success(res, result.rows, "success", "Get Detail Flight Success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "Failed to get detail flight");
      });
  },
  update: (req, res) => {
    const id_portofolio = req.params.id_portofolio;
    const { title, link } = req.body;
    const image = req.file.filename;
    portofolioModel
      .updatePortofolio(id_portofolio, title, image, link)
      .then((result) => {
        res.json({
          message: "success update data",
          data: result,
        });
      })
      .catch((err) => {
        res.json(err);
      });
  },
};
//   // get all

//   // get detail
//   detail: (req, res) => {
//     const id_flight = req.query.id;

//     portfolioModel
//       .detailFlight(id_flight)
//       .then((result) => {
//         success(res, result.rows, "success", "Get Detail Flight Success");
//       })
//       .catch((err) => {
//         failed(res, err.message, "failed", "Failed to get detail flight");
//       });
//   },

//   // find flight
//   find: (req, res) => {
//     const page = req.params.page;
//     const data = req.body;

//     portfolioModel
//       .findFlight(data.limit, page, data.sortBy, data.sortOrd, data.data)
//       .then((result) => {
//         success(res, result.rows, "success", "Search Flight Success");
//       })
//       .catch((err) => {
//         failed(res, err.message, "failed", "Failed to search flight");
//       });
//   },

//   // delete flight
//   destroy: (req, res) => {
//     const id_flight = req.query.id;

//     portfolioModel
//       .deleteFlight(id_flight)
//       .then((result) => {
//         success(res, result.rowCount, "success", "Delete Flight Success");
//       })
//       .catch((err) => {
//         failed(res, err.message, "failed", "Failed to delete flight");
//       });
//   },

//   // update flight
//   update: (req, res) => {
//     const { data } = req.body;

//     portfolioModel
//       .updateFlight(data)
//       .then((result) => {
//         success(res, result.rowCount, "success", "Update Flight Success");
//       })
//       .catch((err) => {
//         failed(res, err.message, "failed", "Failed to update flight");
//       });
//   },

//   // update capacity
//   updateCapacity: (req, res) => {
//     const { id_flight, capacity } = req.body;

//     portfolioModel
//       .updateCapacity(id_flight, capacity)
//       .then((result) => {
//         success(
//           res,
//           result.rowCount,
//           "success",
//           "Update Flight Capacity Success"
//         );
//       })
//       .catch((err) => {
//         failed(res, err.message, "failed", "Failed to update flight capacity");
//       });
//   },

//   // insert flight
//   insert: (req, res) => {
//     const { data } = req.body;

//     portfolioModel
//       .insertFlight(data)
//       .then((result) => {
//         success(res, result.rowCount, "success", "Insert Flight Success");
//       })
//       .catch((err) => {
//         failed(res, err.message, "failed", "Failed to insert flight");
//       });
//   },
// };

module.exports = portofolioController;
