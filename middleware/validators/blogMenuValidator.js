const joi = require('joi');
const HttpStatusCode = require('http-status-codes');

class BlogMenuValidator {
    constructor() { }

    static async insert(req, res, next) {
        try {
            await joi.object({
                BlogMenuName: joi.string().required(),
                BlogMenuDescription: joi.string().required()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }
}

module.exports = BlogMenuValidator;