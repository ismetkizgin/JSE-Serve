const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken } = require('../middleware');
const teamMemberTransactions = TransactionsFactory.creating('teamMemberTransactions');
const teamMemberValidator = validators.teamMemberValidator;
const tokenControl = verifyToken.tokenControl;
const ImageUploadFactory = require('../middleware/imageUploads/imageUploadFactory');
const multerImageUpload = ImageUploadFactory.creating('multerImageUpload');

router.post('/team-member', tokenControl, multerImageUpload.upload, teamMemberValidator.insert, async (req, res) => {
    try {
        const result = await teamMemberTransactions.insertAsync(Object.assign(req.body, { TeamMemberImagePath: req.file.path.replace('public', '') }))
        res.json(result);
    } catch (error) {
        await multerImageUpload.remove(req.file.path);
        res.status(error.status || 500).send(error.message);
    }
});

router.put('/team-member', tokenControl, multerImageUpload.upload, teamMemberValidator.update, async (req, res) => {
    try {
        if (req.file)
            req.body.TeamMemberImagePath = req.file.path.replace('public', '');
        const result = await teamMemberTransactions.updateAsync(req.body);
        res.json(result);
    } catch (error) {
        if (req.file) await multerImageUpload.remove(req.file.path);
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

module.exports = router;