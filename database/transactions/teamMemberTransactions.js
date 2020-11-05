const { mysqlDataContext } = require('../dataContexts');
const HttpStatusCode = require('http-status-codes');
const { sqlHelper } = require('../../utils');

class TeamMemberTransactions {
    constructor() {
        this._datacontext = mysqlDataContext.connection();
    }

    insertAsync(values) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`INSERT INTO tblTeamMember SET ?`, values, (error, result) => {
                if (!error) {
                    if (result.affectedRows)
                        resolve('Blog registration completed.');
                    else
                        reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: 'Error while registering team member !' });
                }
                else {
                    reject(error.errno == 1062 ? { status: HttpStatusCode.CONFLICT, message: 'There is such team member !' } : { status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }

    updateAsync(values) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`UPDATE tblTeamMember SET ? WHERE TeamMemberID=?`, [values, values.TeamMemberID], (error, result) => {
                if (!error) {
                    if (result.affectedRows)
                        resolve('Team member information has been updated.');
                    else
                        reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: 'An error occurred while updating team member information !' });
                }
                else {
                    reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }

    deleteAsync(TeamMemberID) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`DELETE FROM tblTeamMember WHERE TeamMemberID=?`, [TeamMemberID], (error, result) => {
                if (!error) {
                    if (result.affectedRows)
                        resolve('Deletion succeeded.');
                    else
                        reject({ status: HttpStatusCode.GONE, message: 'There is no such team member !' });
                }
                else {
                    reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }

    findAsync(TeamMemberID) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`SELECT * FROM tblTeamMember WHERE TeamMemberID=?`, [TeamMemberID], (error, result) => {
                if (!error) {
                    if (result.length > 0)
                        resolve(result[0]);
                    else
                        reject({ status: HttpStatusCode.NOT_FOUND, message: 'No team member registered to the system was found.' });
                }
                else {
                    reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }

    listAsync(values) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`SELECT * FROM tblTeamMember ORDER BY TeamMemberID ASC  ${sqlHelper.getLimitOffset(values)}`, (error, result) => {
                if (!error) {
                    if (result.length > 0)
                        resolve(result);
                    else
                        reject({ status: HttpStatusCode.NOT_FOUND, message: 'No team member registered to the system was found.' });
                }
                else {
                    reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }
}

module.exports = TeamMemberTransactions;