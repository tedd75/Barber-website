const KlientRepository = require('../repository/sequelize/KlientRepository');

exports.getKlients = (req, res, next) => {
    KlientRepository.getKlients()
        .then(klient => {
            res.status(200).json(klient);
        });
};

exports.getKlientById = (req, res, next) => {
    const klId = req.params.klId;
    KlientRepository.getKlientById(klId)
        .then(kl => {
            if (!kl) {
                res.status(404).json({
                    message: 'Klient with id: ' + klId + ' not found'
                })
            } else {
                res.status(200).json(kl);
            }
        });
};

exports.createKlient = (req, res, next) => {
    KlientRepository.createKlient(req.body)
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

exports.updateKlient = (req, res, next) => {
    const klId = req.params.klId;
    KlientRepository.updateKlient(klId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Klient updated!', kl: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteKlient = (req, res, next) => {
    const klId = req.params.klId;
    KlientRepository.deleteKlient(klId)
        .then(result => {
            res.status(200).json({ message: 'Removed klient', kl: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};


