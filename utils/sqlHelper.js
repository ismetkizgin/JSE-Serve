const { object } = require("joi");

module.exports.getWhere = (object) => {
    let where = 'WHERE ';
    for (const [key, value] of Object.entries(object)) {
        if (key === 'limit' || key === 'offset')
            continue;
        where += where === 'WHERE ' ? `${key}=${value}` : ` and ${key}=${value}`;
    }
    return where === 'WHERE ' ? '' : where;
}

module.exports.getLimitOffset = (object) => {
    return object.offset == null ? `${object.limit == null ? '' : `LIMIT ${object.limit}`}` : `LIMIT ${object.offset},${object.limit}`;
}