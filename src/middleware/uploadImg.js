const multer = require('multer');
const path = require('path');
const db = require('../config/db');

const currentDate = new Date();
const dateTime = currentDate.getDate() + '' + (currentDate.getMonth()+1) + '' + currentDate.getFullYear();
const timestamp = currentDate.getHours() + '' + currentDate.getMinutes() + '' + currentDate.getSeconds()

const multerUpload = multer({
    storage: multer.diskStorage({
        // destination: (req, file, cb) => {
        //     cb(null, './public');
        // },
        filename: (req, file, cb) => {
            const name = path.basename(file.originalname);
            const ext = path.extname(file.originalname);
            const nameSplit = name.split(`${ext}`);

            const fileName = nameSplit[0] + '-' + dateTime + timestamp + ext;
            cb(null, fileName);
        }
    }),
    limits: {
        // limit filesize up to 1mb
        fileSize: 1024 * 1024,
    },

    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);

        if(ext === '.jpg' || ext === '.png' || ext === '.jpeg' || ext === '.jfif'){
            cb(null, true);
        }else{
            const error = {
                message: 'File type is not supported'
            }
            cb(error, false);
        }
    }
})

module.exports = {
    upload: (req, res, next) => {
        const multerSingle = multerUpload.single('image');
        multerSingle(req, res, (err) => {
            if(err){
                res.json({
                    message: 'upload failed',
                    error: err
                })
            }else{

                next();
            }
        })
    },
}

// const multer = require('multer');

// // import path
// const path = require('path');
// const db = require('../config/db');

// // manajemen file
// const multerUpload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, './public');
//     },
//     filename: (req, file, cb) => {
//       const ext = path.extname(file.originalname);
//       const filename = `${Date.now()}${ext}`;
//       cb(null, filename);
//     },
//   }),
//   fileFilter: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     if (ext === '.jpg' || ext === '.png') {
//       cb(null, true);
//     } else {
//       const error = {
//         message: 'file type not supported',
//       };
//       cb(error, false);
//     }
//   },
//   limits: {
//     fileSize: 1024 * 1024 * 2,
//   },
// });

// const upload = (req, res, next) => {
//   const multerSingle = multerUpload.single('image');
//   multerSingle(req, res, (err) => {
//     if (err) {
//       res.json({
//         message: 'error',
//         error: err,
//       });
//     } else {
//       next();
//     }
//   });
// };
// module.exports = upload;