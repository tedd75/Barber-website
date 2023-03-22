const Sequelize = require('sequelize');

const Klient = require('../../model/sequelize/Klient');
const Usluga = require('../../model/sequelize/Usluga');
const Wizyta = require('../../model/sequelize/Wizyta');

exports.getWizytas = () => {
    return Wizyta.findAll({
        include: [
            {
                model: Klient,
                as: 'klient'
            },
            {
                model: Usluga,
                as: 'usluga'
            }]
    });
};

exports.getWizytaById = (wizytaId) => {
    return Wizyta.findByPk(wizytaId, {
        include: [
            {
                model: Klient,
                as: 'klient'
            },
            {
                model: Usluga,
                as: 'usluga'


            }
        ]
    });
};

exports.createWizyta = (newWizyData) => {
    console.log(JSON.stringify(newWizyData));

    return Wizyta.create({
        kl_id: newWizyData.kl_id,
        uslu_id: newWizyData.uslu_id,
        cena: newWizyData.cena,
        data: newWizyData.data
    });
};

exports.updateWizyta = (wizytaId, wizyData) => {
    return Wizyta.update(wizyData, { where: { _id: wizytaId } });

}

exports.deleteWizyta = (wizytaId) => {
    return Wizyta.destroy({
        where: { _id: wizytaId }
    });
}

exports.deleteManyWizyta = (wizytaIds) => {
    return Wizyta.find({ _id: { [Sequelize.Op.in]: wizytaIds } })
}