const joi = require('joi');
const HttpStatusCode = require('http-status-codes');

class ProjectValidator {
    constructor() { }

    static async insert(req, res, next) {
        try {
            await joi.object({
                ProjectName: joi.string().required(),
                ProjectDescription: joi.string().required()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }

    static async update(req, res, next) {
        try {
            await joi.object({
                ProjectID: joi.number().required(),
                ProjectName: joi.string().required(),
                ProjectDescription: joi.string().required()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }
}

module.exports = ProjectValidator;