const DB = require('../models/Database');

module.exports = {

    getById(id) {
        return DB.accessor.query(
            'SELECT * FROM characters WHERE id = ${userID}',
            { userID: id }
        )
            .then((result) => {
                if (result.length === 0) {
                    throw 'CHARACTER NOT_FOUND';
                }
                return result[0]
            })
    },
   

    getAll() {
        return DB.accessor.query('SELECT * FROM characters')
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })
    },
   
    create(name, chaclass, user_id, point_x, point_y) {
        return DB.accessor.query(
            'INSERT INTO characters(name,class,user_id,position) VALUES(${Name},${Class},${User_id},${Position}) RETURNING *',
            {
                Name: name,
                Class: chaclass,
                User_id: user_id,
                Position: '(' + point_x + ',' + point_y + ')'
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
            'delete from characters where id = ${characterID}',
            { characterID: id }
        )
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })


    },
    updateById(id, name, user_id, chaclass, point_x, point_y) {
        /* DB.accessor.query(
            'select * from characters where id = ${characterID}',
            { characterID: id }
        )
            .then((result) => {
                if (result.length === 0) {
                    throw 'CHARACTER NOT_FOUND';
                }*/
        return DB.accessor.query(
            'update characters set name=${characterName}, user_id=${userID},class=${cclass},position=${point} where id=${characterID};select * from characters where id = ${characterID}',
            {
                characterID: id,
                characterName: name,
                userID: user_id,
                cclass: chaclass,
                point: '(' + point_x + ',' + point_y + ')'
            })
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })

    }


};