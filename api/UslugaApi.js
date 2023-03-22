const UslugaRepository = require('../repository/sequelize/UslugaRepository');

exports.getUslugas = (req, res, next) => {
    UslugaRepository.getUslugas()
        .then(usluga => {
            res.status(200).json(usluga);
        });
};

exports.getUslugaById = (req, res, next) => {
    const usluId = req.params.usluId;
    UslugaRepository.getUslugaById(usluId)
        .then(uslu => {
            if (!uslu) {
                res.status(404).json({
                    message: 'Usluga with id: ' + usluId + ' not found'
                })
            } else {
                res.status(200).json(uslu);
            }
        });
};

exports.createUsluga = (req, res, next) => {
    UslugaRepository.createUsluga(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateUsluga = (req, res, next) => {
    const usluId = req.params.usluId;
    UslugaRepository.updateUsluga(usluId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Usluga updated!', uslu: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteUsluga = (req, res, next) => {
    const usluId = req.params.usluId;
    UslugaRepository.deleteUsluga(usluId)
        .then(result => {
            res.status(200).json({ message: 'Removed usluga', uslu: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};


