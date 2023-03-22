const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Wizyta = sequelize.define('Wizyta', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    kl_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    uslu_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cena: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 3],
                msg: "Pole powinno zawierac od 2 do 3 znakow"
            },
        }
    },
    data: {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            // isAfter: {
            //     args: new Date().toISOString().slice(2, 10),
            //     msg: "Data nie powinna"
            // },
        }
    }

});

module.exports = Wizyta;