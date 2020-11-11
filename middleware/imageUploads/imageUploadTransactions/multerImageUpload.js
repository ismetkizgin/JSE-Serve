const multer = require('multer');
const ImageUpload = require('../base/imageUpload');
const fs = require('fs');
const { promisify } = require('util');
const HttpStatusCode = require('http-status-codes');

class MulterImageUpload extends ImageUpload {
    constructor() {
        super();
    }

    upload(req, res, next) {
        multer({
            storage: multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, `./public/images/${req.path.replace(/[^a-zA-Z -]/g, '').replace('image','')}`);
                },
                filename: function (req, file, cb) {
                    cb(null, new Date().toISOString().replace(/[^0-9]/g, '-') + file.originalname);
                }
            }),
            limits: {
                fileSize: 1024 * 1024 * 5,
                files: 1
            },
            fileFilter: (req, file, cb) => {
                if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                    return cb(new Error('Only Images are allowed !'), false);
                }

                cb(null, true);
            },

        }).single('Image')(req, res, function (err) {
            if (err instanceof multer.MulterError || err || req.file == null && req.method != 'PUT') {
                res.status(HttpStatusCode.EXPECTATION_FAILED).send('A picture in the correct format is needed for the process to take place !');
            } else {
                next();
            }
        });
    }

    remove(path){ 
       const removeFile = promisify(fs.unlink);
       removeFile(path);
    }
}

module.exports = MulterImageUpload;