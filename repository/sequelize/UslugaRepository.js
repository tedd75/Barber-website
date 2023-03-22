const Klient = require('../../model/sequelize/Klient');
const Usluga = require('../../model/sequelize/Usluga');
const Wizyta = require('../../model/sequelize/Wizyta');

exports.getUslugas = () => {
    return Usluga.findAll();
}

exports.getUslugaById = (klId) => {
    return Usluga.findByPk(klId, {
        include: [
            {
                model: Wizyta,
                as: 'wizyta',
                include: [{
                    model: Klient,
                    as: 'klient'
                }]
            }]
    });
};

exports.createUsluga = (newUsluData) => {
    return Usluga.create({
        nazwa: newUsluData.nazwa,
        rodzaj: newUsluData.rodzaj
    });
};

exports.updateUsluga = (usluId, usluData) => {
    const nazwa = usluData.nazwa;
    const rodzaj = usluData.rodzaj;
    return Usluga.update(usluData, { where: { _id: usluId } });
}

exports.deleteUsluga = (usluId) => {
    return Usluga.destroy({
        where: { _id: usluId }
    });
};