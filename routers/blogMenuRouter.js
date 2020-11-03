const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken, authorization } = require('../middleware');
const blogMenuTransactions = TransactionsFactory.creating('blogMenuTransactions');
const blogMenuValidator = validators.blogMenuValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const HttpStatusCode = require('http-status-codes');

router.post('/blog-menu', tokenControl, authControl, blogMenuValidator.insert, async (req, res) => {
    try {
        const result = await blogMenuTransactions.insertAsync(req.body);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

module.exports = router;