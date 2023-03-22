const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Klient = sequelize.define('Klient', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "error.emptyString"
            },
            len: {
                args: [2, 60],
                msg: "error.stringLen_2_60"
            },
        }
    },

    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "error.emptyString"
            },
            len: {
                args: [2, 60],
                msg: "error.stringLen_2_60"
            },
        }
    },

    telNum: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [9, 12],
                msg: "Pole powinno zawierac od 9 do 12 znakow"
            },
        }
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Klient;