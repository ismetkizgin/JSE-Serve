const joi = require('joi');
const HttpStatusCode = require('http-status-codes');

class MessageValidator {
    constructor() { }

    static async insert(req, res, next) {
        try {
            await joi.object({
                SenderName: joi.string().min(3).max(150).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                MessageSubject: joi.string().min(3).max(150).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')).required(),
                SenderEmail: joi.string().max(100).email().required(),
                SenderPhone: joi.string().min(10).max(15).pattern(new RegExp('[0-9]')).required(),
                Message: joi.string().required()
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
}

module.exports = MessageValidator;