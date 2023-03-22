const Usluga = require('../model/sequelize/Usluga');
const UslugaRepository = require('../repository/sequelize/UslugaRepository');

exports.showUslugaList = (req, res, next) => {
    UslugaRepository.getUslugas()
        .then(uslus => {
            res.render('pages/usluga/list', {
                uslus: uslus,
                navLocation: 'kl'
            });
        });
}

exports.showAddUslugaForm = (req, res, next) => {
    res.render('pages/usluga/dodaj-uslugi', {
        uslu: {},
        pageTitle: req.__('uslu.dodaj-uslugi.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: 'Dodaj usluge',
        formAction: '/usluga/add',
        navLocation: 'uslu',
        validationErrors: []
    });
}

exports.showUslugaDetails = (req, res, next) => {
    const usluId = req.params.usluId;
    UslugaRepository.getUslugaById(usluId)
        .then(uslu => {
            res.render('pages/usluga/szczegoly-uslugi', {
                uslu: uslu,
                formMode: 'showDetails',
                pageTitle: 'Szczegoly uslugi',
                formAction: '',
                navLocation: 'uslu',
                validationErrors: []
            });
        });
}

exports.showUslugaEdit = (req, res, next) => {
    const usluId = req.params.usluId;
    UslugaRepository.getUslugaById(usluId)
        .then(uslu => {
            res.render('pages/usluga/edit-uslugi', {
                uslu: uslu,
                formMode: 'edit',
                pageTitle: 'Edycja uslugi',
                btnLabel: 'Edytuj uslugi',
                formAction: '/usluga/edit',
                navLocation: 'uslu',
                validationErrors: []
            });
        });
}

exports.addUsluga = (req, res, next) => {
    const usluData = { ...req.body };
    UslugaRepository.createUsluga(usluData)
        .then(result => {
            res.redirect('/usluga')
        }).catch(err => {
            res.render('/pages/usluga/dodaj-uslugi', {
                uslu: usluData,
                pageTitle: 'Nowa usluga',
                formMode: 'createNew',
                btnLabel: 'Dodaj uslugi',
                formAction: '/usluga/add',
                validationErrors: err.errors
            });
        });

};

exports.updateUsluga = (req, res, next) => {
    const usluId = req.body._id;
    const usluData = { ...req.body };
    UslugaRepository.updateUsluga(usluId, usluData)
        .then(result => {
            res.redirect('/usluga')
        }).catch(err => {
            res.render('/pages/usluga/edit-uslugi', {
                uslu: usluData,
                pageTitle: 'Edycja uslugi',
                formMode: 'edit',
                btnLabel: 'Edytuj uslugi',
                formAction: '/usluga/edit',
                validationErrors: err.errors
            });
        });
};

exports.deleteUsluga = (req, res, next) => {
    const usluId = req.params.deleteUslu;
    UslugaRepository.deleteUsluga(usluId)
        .then(() => {
            res.redirect('/usluga');
        });
};

exports.showUslugaDelete = (req, res, next) => {
    res.render('pages/usluga/usun-uslugi', { navLocation: 'uslu' });
}