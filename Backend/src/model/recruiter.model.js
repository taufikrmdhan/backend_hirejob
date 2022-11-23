const db = require("../config/db");

const recruiterModel = {
  //   insert: (nama, email, password, phone) => new Promise((resolve, reject) => {
  //     db.query(`INSERT INTO users (nama, email, password, phone) VALUES ('${nama}', '${email}', '${password}', '${phone}')`, (err, result) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(result);
  //       }
  //     });
  //   }),
  list: (limit, offset) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM recruiter LIMIT ${limit} OFFSET ${offset}`,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    }),
  register: ({
    full_name,
    email,
    company_name,
    department,
    phone,
    password,
    level,
    image,
  }) =>
    new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO recruiter (full_name, email, company_name, department, phone, password, level, image) VALUES ('${full_name}', '${email}', '${company_name}', '${department}', '${phone}', '${password}', ${level}, '${image}')`,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    }),
  checkEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        SELECT * FROM recruiter WHERE email = '${email}'
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
  //   checkUsername: (email) => new Promise((resolve, reject) => {
  //     db.query(`SELECT * FROM users WHERE email = '${email}'`, (err, result) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(result);
  //       }
  //     });
  //   }),
  //   list: (limit, offset) => new Promise((resolve, reject) => {
  //     db.query(`SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(result);
  //       }
  //     });
  //   }),
    listRecruiterById: (id_recruiter) => new Promise((resolve, reject) => {
      db.query(`SELECT * FROM recruiter WHERE id_recruiter = ${id_recruiter}`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    }),
    listRecruiterByName: (company_name) => new Promise((resolve, reject) => {
      db.query(`SELECT * FROM recruiter WHERE lower(company_name) LIKE lower ('${company_name}')`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    }),
    deleteRecruiter: (id_recruiter) => new Promise((resolve, reject) => {
      db.query(`DELETE FROM recruiter WHERE id_recruiter = ${id_recruiter}`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    }),
    updateRecruiter: (
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
      ) =>{
        return new Promise((resolve, reject) => {
          db.query(
            `
            UPDATE recruiter SET full_name = '${full_name}', email = '${email}', company_name = '${company_name}', department = '${department}', phone = '${phone}', business = '${business}', city = '${city}', linkedin = '${linkedin}', instagram = '${instagram}', image = '${image}', description = '${description}' WHERE id_recruiter = ${id_recruiter}
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
  //   update: (id_user, image) => new Promise((resolve, reject) => {
  //     db.query(`UPDATE users SET image = '${image}' WHERE id_user = ${id_user}`, (err, result) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(result);
  //       }
  //     });
  //   }),
  //   updateByEmail: (email, password) => new Promise((resolve, reject) => {
  //     db.query(`UPDATE users SET password = '${password}' WHERE email = '${email}'`, (err, result) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(result);
  //       }
  //     });
  //   }),
};
module.exports = recruiterModel;
