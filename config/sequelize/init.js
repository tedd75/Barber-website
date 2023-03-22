const sequelize = require('./sequelize');

const Klient = require('../../model/sequelize/Klient');
const Usluga = require('../../model/sequelize/Usluga');
const Wizyta = require('../../model/sequelize/Wizyta');

const authUtil = require('../../util/authUtils');
const passHash = authUtil.hashPassword('12345');


module.exports = () => {
    Klient.hasMany(Wizyta, { as: 'wizyta', foreignKey: { name: 'kl_id', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    Wizyta.belongsTo(Klient, { as: 'klient', foreignKey: { name: 'kl_id', allowNull: false } });
    Usluga.hasMany(Wizyta, { as: 'wizyta', foreignKey: { name: 'uslu_id', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    Wizyta.belongsTo(Usluga, { as: 'usluga', foreignKey: { name: 'uslu_id', allowNull: false } });

    let allKl, allUslu;
    return sequelize
        .sync({ force: true })
        .then(() => {
            return Klient.findAll()
        })
        .then(kl => {
            if (!kl || kl.length == 0) {
                return Klient.bulkCreate([
                    { firstName: 'Jan', lastName: 'Pierwszy', telNum: '+48535093067', password: passHash },
                    { firstName: 'Piotr', lastName: 'Drugi', telNum: '+48123456789', password: passHash }
                ])
                    .then(() => {
                        return Klient.findAll();
                    });
            } else {
                return kl;
            }
        })
        .then(kl => {
            allKl = kl;
            return Usluga.findAll();
        })
        .then(uslu => {
            if (!uslu || uslu.length == 0) {
                return Usluga.bulkCreate([
                    { nazwa: 'Strzyżenie', rodzaj: 'VIP' },
                    { nazwa: 'Strzyżenie + Broda', rodzaj: 'Combo' }
                ])
                    .then(() => {
                        return Klient.findAll();
                    });
            } else {
                return uslu;
            }
        })
        .then(uslu => {
            allUslu = uslu;
            return Wizyta.findAll();
        })
        .then(wizy => {
            if (!wizy || wizy.length == 0) {
                return Wizyta.bulkCreate([
                    { kl_id: allKl[0]._id, uslu_id: allUslu[0]._id, cena: 100, data: '2022-10-30' },
                    { kl_id: allKl[1]._id, uslu_id: allUslu[0]._id, cena: 120, data: '2022-10-30' },
                    { kl_id: allKl[0]._id, uslu_id: allUslu[1]._id, cena: 50, data: '2022-11-07' }
                ]);
            } else {
                return wizy;
            }
        });
};
