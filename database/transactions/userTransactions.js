const { mysqlDataContext } = require('../dataContexts');
const HttpStatusCode = require('http-status-codes');

class UserTransactions {
    constructor() {
        this._datacontext = mysqlDataContext.connection();
    }

    loginAsync(values) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`SELECT * FROM tblUser where UserEmail=? and UserPassword=?`, [values.UserEmail, values.UserPassword], (error, result) => {
                if (!error) {
                    if (result.length) {
                        delete result[0].UserPassword;
                        resolve(result[0]);
                    }
                    else
                        reject({ status: HttpStatusCode.NOT_FOUND, message: 'There is no such user !' });
                }
                else
                    reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
            });
        });
    }
}

module.exports = UserTransactions;