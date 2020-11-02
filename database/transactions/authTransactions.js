const { mysqlDataContext } = require('../dataContexts');
const HttpStatusCode = require('http-status-codes');

class AuthTransactions {
    constructor() {
        this.datacontext = mysqlDataContext.connection();
    }

    additiveUserTypesAsync(UserTypeName) {
        return new Promise((resolve, reject) => {
            this.datacontext.query(`SELECT UserTypeName FROM tblUserType WHERE UserTypeNumber<(SELECT UserTypeNumber FROM tblUserType WHERE UserTypeName=?)`, [UserTypeName], (error, result) => {
                if (!error) {
                    if (result.length)
                        resolve(result);
                    else
                        reject({ status: HttpStatusCode.NOT_FOUND, message: 'Unauthorized transaction !' });
                }
                else
                    reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
            });
        });
    }
}

module.exports = AuthTransactions;