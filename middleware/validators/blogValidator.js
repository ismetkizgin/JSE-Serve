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
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }
}

module.exports = BlogMenuValidator;