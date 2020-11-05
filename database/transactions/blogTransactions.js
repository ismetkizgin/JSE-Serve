const { mysqlDataContext } = require('../dataContexts');
const HttpStatusCode = require('http-status-codes');
const { sqlHelper } = require('../../utils');

class BlogTransactions {
    constructor() {
        this._datacontext = mysqlDataContext.connection();
    }

    insertAsync(values) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`INSERT INTO tblBlog SET ?`, values, (error, result) => {
                if (!error) {
                    if (result.affectedRows)
                        resolve('Blog registration completed.');
                    else
                        reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: 'Error while registering blog !' });
                }
                else {
                    reject(error.errno == 1062 ? { status: HttpStatusCode.CONFLICT, message: 'There is such blog !' } : { status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }
}

module.exports = BlogTransactions;