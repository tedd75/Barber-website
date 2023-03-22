const Klient = require('../../model/sequelize/Klient');
const Usluga = require('../../model/sequelize/Usluga');
const Wizyta = require('../../model/sequelize/Wizyta');


exports.getKlients = () => {
    return Klient.findAll();
}

exports.getKlientById = (klId) => {
    return Klient.findByPk(klId, {
        include: [
            {
                model: Wizyta,
                as: 'wizyta',
                include: [{
                    model: Usluga,
                    as: 'usluga'
                }]
            }]
    });
};

exports.createKlient = (newKlData) => {
    return Klient.create({
        firstName: newKlData.firstName,
        lastName: newKlData.lastName,
        telNum: newKlData.telNum
    });
};

exports.updateKlient = (klId, klData) => {

    const firstName = klData.firstName;
    const lastName = klData.lastName;
    const telNum = klData.telNum;
    return Klient.update(klData, { where: { _id: klId } });
}

exports.deleteKlient = (klId) => {
    return Klient.destroy({
        where: { _id: klId }
    });
};

exports.findByLastName = (lastName) => {
    return Klient.findOne({
        where: { lastName: lastName }
    });
}
