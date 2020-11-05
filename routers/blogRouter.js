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

router.put('/blog', tokenControl, multerImageUpload.upload, blogValidator.update, async (req, res) => {
    try {
        if (routerAuthorization[req.method].Individual_Authorize.indexOf(req.decode.UserTypeName) != -1) {
            const findBlog = await blogTransactions.findAsync(req.body.BlogID);
            if (findBlog.UserID != req.decode.UserID) {
                res.status(HttpStatusCode.UNAUTHORIZED).send('Unauthorized transaction !')
                return;
            }
        }
        const result = await blogTransactions.updateAsync(req.body);
        res.json(result);
    } catch (error) {
        if (req.file) await multerImageUpload.remove(req.file.path);
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

module.exports = router;