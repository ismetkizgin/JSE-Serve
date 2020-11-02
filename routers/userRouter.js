const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken, authorization } = require('../middleware');
const userTransactions = TransactionsFactory.creating('userTransactions');
const userValidator = validators.userValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const userInsertAuthControl = authorization.userInsertAuthControl;
const HttpStatusCode = require('http-status-codes');

router.get('/user', tokenControl, authControl, userValidator.list, async (req, res) => {
    try {
        const result = await userTransactions.listAsync(req.query);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

module.exports = router;