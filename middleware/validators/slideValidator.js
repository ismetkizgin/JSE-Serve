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
            await multerImageUpload.remove(req.file.path);
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }

    static async update(req, res, next) {
        try {
            await joi.object({
                SlideID: joi.number().required(),
                SlideLink: joi.string()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            if (req.file) await multerImageUpload.remove(req.file.path);
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }

    static async delete(req, res, next) {
        try {
            await joi.object({
                SlideID: joi.number().required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            console.log(error)
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }

    static async list(req, res, next) {
        try {
            await joi.object({
                limit: joi.number(),
                offset: joi.number()
            }).with('offset', 'limit').validateAsync(req.query);
            next();
        } catch (error) {
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }

    static async find(req, res, next) {
        try {
            await joi.object({
                SlideID: joi.number().min(1).required(),
            }).validateAsync({ SlideID: parseInt(req.params.SlideID) });
            next();
        } catch (error) {
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }
}

module.exports = SlideValidator;