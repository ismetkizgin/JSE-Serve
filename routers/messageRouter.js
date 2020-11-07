const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken, authorization } = require('../middleware');
const messageTransactions = TransactionsFactory.creating('messageTransactions');
const messageValidator = validators.messageValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const HttpStatusCode = require('http-status-codes');

router.post('/message', messageValidator.insert, async (req, res) => {
    try {
        const result = await messageTransactions.insertAsync(req.body);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

module.exports = router;