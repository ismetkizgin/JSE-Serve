const joi = require('joi');
const HttpStatusCode = require('http-status-codes');
const ImageUploadFactory = require('../imageUploads/imageUploadFactory');
const multerImageUpload = ImageUploadFactory.creating('multerImageUpload');

class SlideValidator {
    constructor() { }

    static async insert(req, res, next) {
        try {
            await joi.object({
                SlideLink: joi.string()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            await multerImageUpload.remove('public' + req.file.path);
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }
}

module.exports = SlideValidator;