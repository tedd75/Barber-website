const WizytaRepository = require('../repository/sequelize/WizytaRepository');

exports.getWizyta = (req, res, next) => {
    WizytaRepository.getWizytas()
        .then(wizyta => {
            res.status(200).json(wizyta);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getWizytaById = (req, res, next) => {
    const wizytaId = req.params.wizytaId;
    WizytaRepository.getWizytaById(wizytaId)
        .then(wizyta => {
            if (!wizyta) {
                res.status(404).json({
                    message: 'Wizyta with id: ' + wizytaId + ' not found'
                })
            } else {
                res.status(200).json(wizyta);
            }
        });
};

exports.createWizyta = (req, res, next) => {
    WizytaRepository.createWizyta(req.body)
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

exports.updateWizyta = (req, res, next) => {
    const wizytaId = req.params.wizytaId;
    WizytaRepository.updateWizyta(wizytaId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Wizyta updated!', wizyta: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteWizyta = (req, res, next) => {
    const wizytaId = req.params.wizytaId;
    WizytaRepository.deleteWizyta(wizytaId)
        .then(result => {
            res.status(200).json({ message: 'Removed wizyta', wizyta: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};


