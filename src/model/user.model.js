const db = require("../config/db");

const userModel = {
  //   insert: (nama, email, password, phone) =>
  //     new Promise((resolve, reject) => {
  //       db.query(
  //         `INSERT INTO users (nama, email, password, phone) VALUES ('${nama}', '${email}', '${password}', '${phone}')`,
  //         (err, result) => {
  //           if (err) {
  //             reject(err);
  //           } else {
  //             resolve(result);
  //           }
  //         }
  //       );
  //     }),
  register: ({ name, email, password, phone, image }) =>
    new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (name, email, password, phone, image) VALUES ('${name}', '${email}', '${password}', '${phone}', '${image}')`,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    }),
  list: (sort, asc, limit, offset) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users order by ${sort} ${asc} LIMIT ${limit} OFFSET ${offset}`,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    }),
// list: (limit, offset) =>
//     new Promise((resolve, reject) => {
//       db.query(
//         `SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`,
//         (err, result) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve(result);
//           }
//         }
//       );
//     }),

  listUserById: (id_user) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
			SELECT * FROM users WHERE id_user = ${id_user}`
      )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  listUserByName: (name) => {
	return new Promise((resolve, reject) => {
	  db.query(
		`
		SELECT * FROM users WHERE lower(name) LIKE lower ('%${name}%')`
	  )
		.then((response) => {
		  resolve(response);
		})
		.catch((error) => {
		  reject(error);
		});
	});
  },
  updateUser: (
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
  ) =>{
	return new Promise((resolve, reject) => {
	  db.query(
		`
			UPDATE users SET name = '${name}',  phone = '${phone}', job_desk = '${job_desk}', title = '${title}', city = '${city}', skill = '${skill}', instagram = '${instagram}', github = '${github}', gitlab = '${gitlab}', portofolio = '${portofolio}', image = '${image}', description = '${description}' WHERE id_user = ${id_user}`
	  )
		.then((response) => {
		  resolve(response);
		})
		.catch((error) => {
		  reject(error);
		});
	});
  },

  checkEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        SELECT * FROM users WHERE email = '${email}'
        `
      )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  deleteUser: (id_user) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
  			DELETE FROM users WHERE id_user = ${id_user}`
      )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

module.exports = userModel;
