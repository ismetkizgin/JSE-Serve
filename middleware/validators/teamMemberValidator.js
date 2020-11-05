const joi = require('joi');
const HttpStatusCode = require('http-status-codes');

class TeamMemberValidator {
    constructor() { }

    static async insert(req, res, next) {
        try {
            await joi.object({
                TeamMemberName: joi.string().required(),
                TeamMemberTitle: joi.string().required(),
                TeamMemberGithub: joi.string().required(),
                TeamMemberLinkedin: joi.string().required(),
                TeamMemberCompany: joi.string().required(),
                TeamMemberDescription: joi.string().required()
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
                TeamMemberID: joi.number().required(),
                TeamMemberName: joi.string().required(),
                TeamMemberTitle: joi.string().required(),
                TeamMemberGithub: joi.string().required(),
                TeamMemberLinkedin: joi.string().required(),
                TeamMemberCompany: joi.string().required(),
                TeamMemberDescription: joi.string().required()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            await multerImageUpload.remove(req.file.path);
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }

    static async delete(req, res, next) {
        try {
            await joi.object({
                TeamMemberID: joi.number().required(),
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
                TeamMemberID: joi.number().min(1).required(),
            }).validateAsync({ TeamMemberID: parseInt(req.params.TeamMemberID) });
            next();
        } catch (error) {
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }
}

module.exports = TeamMemberValidator;