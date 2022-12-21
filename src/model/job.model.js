const { resolve } = require("path");
const db = require("../config/db");

const jobModel = {
  // all flight list
  insertJob: (job_title, company, date_in, date_out, description, image) =>
    new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO job_experience (job_title, company, date_in, date_out, description, image, image_url, image_public_id, image_secure_url) VALUES ('${job_title}', '${company}', '${date_in}', '${date_out}', '${description}', '${image}', '${image_url}', '${image_public_id}', '${image_secure_url}')`,
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
  getAllJob: () => {
    return new Promise((resolve, reject) => {
      db.query(`select * from job_experience;`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  deleteJob: (id_job) => {
    return new Promise((resolve, reject) => {
      db.query(
        `delete from job_experience where id_job=${id_job}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  getDetailJob: (id_job) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from job_experience where id_job=${id_job};`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  updateJob: (
    id_job,
    job_title,
    company,
    date_in,
    date_out,
    description,
    image
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE job_experience SET job_title='${job_title}', company='${company}', date_in='${date_in}', date_out='${date_out}', description='${description}', image='${image}' WHERE id_job=${id_job}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
};

module.exports = jobModel;
