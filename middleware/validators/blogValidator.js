const joi = require('joi');
const HttpStatusCode = require('http-status-codes');

class BlogMenuValidator {
    constructor() { }

    static async insert(req, res, next) {
        try {
            await joi.object({
                BlogTitle: joi.string().required(),
                BlogDescription: joi.string().required(),
                BlogContent: joi.string().required(),
                BlogState: joi.boolean(),
                BlogMenuID: joi.number().required()
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
                BlogID: joi.number().required(),
                BlogTitle: joi.string().required(),
                BlogDescription: joi.string().required(),
                BlogContent: joi.string().required(),
                BlogState: joi.boolean(),
                BlogMenuID: joi.number().required()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            if(req.file) await multerImageUpload.remove(req.file.path);
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }

    static async delete(req, res, next) {
        try {
            await joi.object({
                BlogID: joi.number().required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }

    static async list(req, res, next) {
        try {
            await joi.object({
                limit: joi.number(),
                offset: joi.number(),
                BlogState: joi.boolean(),
                UserID: joi.number()
            }).with('offset', 'limit').validateAsync(req.query);
            next();
        } catch (error) {
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }

    static async find(req, res, next) {
        try {
            await joi.object({
                BlogID: joi.number().min(1).required(),
            }).validateAsync({ BlogID: parseInt(req.params.BlogID) });
            next();
        } catch (error) {
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }
}

module.exports = BlogMenuValidator;