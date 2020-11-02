const joi = require('joi');
const HttpStatusCode = require('http-status-codes');


class AuthValidator {
    constructor() { }

    static async login(req, res, next) {
        try {
            await joi.object({
                UserEmail: joi.string().email().required(),
                UserPassword: joi.string().required()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }

    static async changePassword(req, res, next) {
        try {
            await joi.object({
                UserPassword: joi.string().max(99).required(),
                UserNewPassword: joi.string().max(99).required()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }

    static async update(req, res, next) {
        try {
            await joi.object({
                UserFirstName: joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                UserLastName: joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                UserEmail: joi.string().email().required(),
                UserPassword: joi.string().max(99).required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }

    static async delete(req, res, next) {
        try {
            await joi.object({
                UserPassword: joi.string().max(99).required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }
}

module.exports = AuthValidator;