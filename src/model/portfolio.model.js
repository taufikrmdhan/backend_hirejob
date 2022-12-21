const db = require("../config/db");

const portofolioModel = {
  // insertPortofolio: (title, image, link, id_user) =>
  //   new Promise((resolve, reject) => {
  //     db.query(
  //       `INSERT INTO portofolio (title, image, link, id_user) VALUES ('${title}', '${image}', '${link}', ${id_user})`,
  //       (err, result) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(result);
  //         }
  //       }
  //     );
  //   }),
  insertPortofolio: ({title, image, link, image_url, image_public_id, image_secure_url}) =>
  new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO portofolio (title, image, link, image_url, image_public_id, image_secure_url) VALUES ('${title}', '${image}', '${link}', '${image_url}', '${image_public_id}', '${image_secure_url}')`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  }),
  // get airline list
  getAllPortofolio: (id_user) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from portofolio join users on portofolio.id_user = users.id_user where portofolio.id_user=${id_user} `, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  getAllPortofolioAll: () => {
    return new Promise((resolve, reject) => {
      db.query(`select * from portofolio`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  deletePortofolio: (id_portofolio) => {
    return new Promise((resolve, reject) => {
      db.query(
        `delete from portofolio where id_portofolio=${id_portofolio}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  getDetailPorto: (id_portofolio) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from portofolio where id_portofolio=${id_portofolio};`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  updatePortofolio: (id_portofolio, title, image, link) => {
	return new Promise((resolve, reject) => {
	  db.query(
		`UPDATE portofolio SET title='${title}', image='${image}', link='${link}' WHERE id_portofolio=${id_portofolio}`,
		(err, res) => {
		  if (err) {
			reject(err);
		  }
		  resolve(res);
		}
	  );
	});
  }
};

// get detail

// 	// search airline
// 	findAirline: (limit, page, sortBy, sortOrd, airlineName) => {
// 		return new Promise((resolve, reject) => {
// 			const offset = (page - 1) * limit;

// 			if (sortOrd.toLowerCase() !== "desc") sortOrd = "asc";
// 			if (sortBy.toLowerCase() !== "date_created") sortBy = "name";

// 			db.query(
// 				`select * from airline where lower(name) like lower('%${airlineName}%') order by ${sortBy} ${sortOrd} limit ${limit} offset ${offset}`,
// 				(err, res) => {
// 					if (err) {
// 						reject(err);
// 					}
// 					resolve(res);
// 				}
// 			);
// 		});
// 	},

// 	// search airline by name
// 	searchAirline: (name) => {
// 		return new Promise((resolve, reject) => {
// 			db.query(
// 				`
//             SELECT * FROM airline WHERE name ILIKE '%${name}%'`,
// 				(err, res) => {
// 					if (err) {
// 						reject(err);
// 					}
// 					resolve(res);
// 				}
// 			);
// 		});
// 	},

// 	// insert airline
// 	addAirline: ({ name, logo }) => {
// 		return new Promise((resolve, reject) => {
// 			const date = new Date();
// 			const yyyy = date.getFullYear();
// 			let mm = date.getMonth() + 1;
// 			let dd = date.getDate();

// 			if (dd < 10) dd = "0" + dd;
// 			if (mm < 10) mm = "0" + mm;

// 			const time =
// 				date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

// 			const date_created = `${yyyy}/${mm}/${dd} - ${time}`;

// 			db.query(
// 				`insert into airline (name, logo, date_created) values ('${name}', '${logo}', '${date_created}');`,
// 				(err, res) => {
// 					if (err) {
// 						reject(err);
// 					}
// 					resolve(res);
// 				}
// 			);
// 		});
// 	},

// 	// update airline
// 	updateAirline: (id_airline, name) => {
// 		return new Promise((resolve, reject) => {
// 			db.query(
// 				`update airline set name='${name}' where id_airline=${id_airline}`,
// 				(err, res) => {
// 					if (err) {
// 						reject(err);
// 					}
// 					resolve(res);
// 				}
// 			);
// 		});
// 	},

// 	// update airline logo
// 	updateLogo: ({ id_airline, logo }) => {
// 		return new Promise((resolve, reject) => {
// 			db.query(
// 				`update airline set logo='${logo}' where id_airline=${id_airline}`,
// 				(err, res) => {
// 					if (err) {
// 						reject(err);
// 					}
// 					resolve(res);
// 				}
// 			);
// 		});
// 	},

// 	// delete airline
// 	deleteAirline: (id_airline) => {
// 		return new Promise((resolve, reject) => {
// 			db.query(
// 				`delete from airline where id_airline=${id_airline}`,
// 				(err, res) => {
// 					if (err) {
// 						reject(err);
// 					}
// 					resolve(res);
// 				}
// 			);
// 		});
// 	},
// };

module.exports = portofolioModel;
