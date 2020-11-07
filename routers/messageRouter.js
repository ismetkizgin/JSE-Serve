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

router.get('/message', tokenControl, authControl, messageValidator.list, async (req, res) => {
    try {
        const result = await messageTransactions.listAsync(req.query);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

router.get('/message/:MessageID', tokenControl, authControl, messageValidator.find, async (req, res) => {
    try {
        messageTransactions.updateAsync({ MessageID: req.params.MessageID, ReadState: true });
        const result = await messageTransactions.findAsync(req.params.MessageID);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

router.delete('/message', tokenControl, authControl, messageValidator.delete, async (req, res) => {
    try {
        const result = await messageTransactions.deleteAsync(req.body.MessageID);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

module.exports = router;