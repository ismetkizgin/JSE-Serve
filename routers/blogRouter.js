const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken } = require('../middleware');
const blogTransactions = TransactionsFactory.creating('blogTransactions');
const blogValidator = validators.blogValidator;
const tokenControl = verifyToken.tokenControl;
let { routerAuthorization } = require('../utils');
routerAuthorization = routerAuthorization['blog'];
const ImageUploadFactory = require('../middleware/imageUploads/imageUploadFactory');
const multerImageUpload = ImageUploadFactory.creating('multerImageUpload');

router.post('/blog', tokenControl, multerImageUpload.upload, blogValidator.insert, async (req, res) => {
    try {
        const result = await blogTransactions.insertAsync(Object.assign(req.body, { UserID: req.decode.UserID, BlogImagePath: req.file.path.replace('public', '') }))
        res.json(result);
    } catch (error) {
        await multerImageUpload.remove(req.file.path);
        res.status(error.status || 500).send(error.message);
    }
});

module.exports = router;