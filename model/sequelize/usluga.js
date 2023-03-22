const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Usluga = sequelize.define('Usluga', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    nazwa: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 60],
                msg: "Pole powinno zawierac od 2 do 60 znakow"
            },
        }
    },

    rodzaj: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 60],
                msg: "Pole powinno zawierac od 2 do 60 znakow"
            },
        }
    }
});

module.exports = Usluga;