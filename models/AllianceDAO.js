const DB = require('../models/Database');

module.exports = {

    getById(id) {
        return DB.accessor.query(
            'SELECT * FROM alliances WHERE id = ${allianceID}',
            { allianceID: id }
        )
            .then((result) => {
                if (result.length === 0) {
                    throw 'ALLIANCE NOT_FOUND';
                }
                return result[0]
            })
    },
    
    getAll() {
        return DB.accessor.query('SELECT * FROM alliances')
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })
    },
    create(alliancename) {
        return DB.accessor.query(
            'INSERT INTO alliances(name) VALUES(${allianceName}) RETURNING *',
            {
                allianceName: alliancename
            })
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })
    },

    deleteById(id) {
        return DB.accessor.query(
            'delete from alliances where id = ${allianceID}',
            { allianceID: id }
        )
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })


    },
    updateById(id, name) {
        return DB.accessor.query(
            'update alliances set name=${allianceName} where id=${allianceID}; select * from alliances where id=${allianceID}',
            {
                allianceID: id,
                allianceName: name
            })
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })
    }



};