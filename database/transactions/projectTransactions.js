const { mysqlDataContext } = require('../dataContexts');
const HttpStatusCode = require('http-status-codes');
const { sqlHelper } = require('../../utils');

class ProjectTransactions {
    constructor() {
        this._datacontext = mysqlDataContext.connection();
    }

    insertAsync(values) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`INSERT INTO tblProject SET ?`, values, (error, result) => {
                if (!error) {
                    if (result.affectedRows)
                        resolve('Project registration completed.');
                    else
                        reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: 'Error while registering project !' });
                }
                else {
                    reject(error.errno == 1062 ? { status: HttpStatusCode.CONFLICT, message: 'There is such project !' } : { status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }

    updateAsync(values) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`UPDATE tblProject SET ? WHERE ProjectID=?`, [values, values.ProjectID], (error, result) => {
                if (!error) {
                    if (result.affectedRows)
                        resolve('Project information has been updated.');
                    else
                        reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: 'An error occurred while updating project information !' });
                }
                else {
                    reject(error.errno == 1062 ? { status: HttpStatusCode.CONFLICT, message: 'There is such project !' } : { status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }

    deleteAsync(ProjectID) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`DELETE FROM tblProject WHERE ProjectID=?`, [ProjectID], (error, result) => {
                if (!error) {
                    if (result.affectedRows)
                        resolve('Deletion succeeded.');
                    else
                        reject({ status: HttpStatusCode.GONE, message: 'There is no such project !' });
                }
                else {
                    reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }

    listAsync(values) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`SELECT * FROM tblProject ORDER BY ProjectID  ${sqlHelper.getLimitOffset(values)}`, (error, result) => {
                if (!error) {
                    if (result.length > 0)
                        resolve(result);
                    else
                        reject({ status: HttpStatusCode.NOT_FOUND, message: 'No blog menu registered to the system was found.' });
                }
                else {
                    reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }

    findAsync(ProjectID) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`SELECT * FROM tblProject WHERE ProjectID=?`, [ProjectID], (error, result) => {
                if (!error) {
                    if (result.length > 0)
                        resolve(result[0]);
                    else
                        reject({ status: HttpStatusCode.NOT_FOUND, message: 'No project registered to the system was found.' });
                }
                else {
                    reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }
}

module.exports = ProjectTransactions;