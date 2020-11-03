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

router.put('/blog-menu', tokenControl, authControl, blogMenuValidator.update, async (req, res) => {
    try {
        const result = await blogMenuTransactions.updateAsync(req.body);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

router.delete('/blog-menu', tokenControl, authControl, blogMenuValidator.delete, async (req, res) => {
    try {
        const result = await blogMenuTransactions.deleteAsync(req.body.BlogMenuID);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

router.get('/blog-menu/', blogMenuValidator.list, async (req, res) => {
    try {
        const result = await blogMenuTransactions.listAsync(req.query);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

router.get('/blog-menu/:BlogMenuID', tokenControl, authControl, blogMenuValidator.find, async (req, res) => {
    try {
        const result = await blogMenuTransactions.findAsync(req.params.BlogMenuID);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

module.exports = router;