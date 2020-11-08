const joi = require('joi');
const HttpStatusCode = require('http-status-codes');


class AuthValidator {
    constructor() { }

    static async update(req, res, next) {
        try {
            await joi.object({
                AboutWe: joi.string(),
                Tweet: joi.string(),
                MailAddress: joi.string().empty(''),
                Linkedin: joi.string().empty(''),
                Github: joi.string().empty(''),
                Instagram: joi.string().empty(''),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }
}

module.exports = AuthValidator;