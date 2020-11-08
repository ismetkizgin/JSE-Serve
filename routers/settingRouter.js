const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken, authorization } = require('../middleware');
const settingTransactions = TransactionsFactory.creating('settingTransactions');
const settingValidator = validators.settingValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const HttpStatusCode = require('http-status-codes');

router.put('/setting', tokenControl, authControl, settingValidator.update, async (req, res) => {
    try {
        const result = await settingTransactions.updateAsync(req.body);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

module.exports = router;