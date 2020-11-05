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
}

module.exports = TeamMemberValidator;