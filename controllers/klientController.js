const Klient = require('../model/sequelize/Klient');
const KlientRepository = require('../repository/sequelize/KlientRepository');

exports.showKlientList = (req, res, next) => {
    KlientRepository.getKlients()
        .then(kls => {
            res.render('pages/klient/list', {
                kls: kls,
                navLocation: 'kl'
            });
        });
}

exports.showAddKlientForm = (req, res, next) => {
    res.render('pages/klient/dodawanie-klienta', {
        kl: {},
        pageTitle: req.__('kl.dodawanie-klienta.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: 'Dodaj klienta',
        formAction: '/klient/add',
        navLocation: 'kl',
        validationErrors: []
    });
}

exports.showKlientDetails = (req, res, next) => {
    const klId = req.params.klId;
    KlientRepository.getKlientById(klId)
        .then(kl => {
            res.render('pages/klient/szczegoly', {
                kl: kl,
                formMode: 'showDetails',
                pageTitle: 'Szczegoly klienta',
                formAction: '',
                navLocation: 'kl',
                validationErrors: []
            });
        });
}

exports.showEditKlientForm = (req, res, next) => {
    const klId = req.params.klId;
    KlientRepository.getKlientById(klId)
        .then(kl => {
            res.render('pages/klient/form-edit', {
                kl: kl,
                formMode: 'edit',
                pageTitle: 'Edycja klienta',
                btnLabel: 'Edytuj klienta',
                formAction: '/klient/edit',
                navLocation: 'kl',
                validationErrors: []
            });
        });
}

exports.addKlient = (req, res, next) => {
    const klData = { ...req.body };
    KlientRepository.createKlient(klData)
        .then(result => {
            res.redirect('/klient')
        })
        .catch(err => {
            res.render('/pages/klient/dodawanie-klienta', {
                kl: klData,
                pageTitle: 'Nowy klient',
                formMode: 'createNew',
                btnLabel: 'Dodaj klienta',
                formAction: '/klient/add',
                validationErrors: err.errors
            });
        });
};

exports.updateKlient = (req, res, next) => {
    const klId = req.body._id;
    const klData = { ...req.body };
    KlientRepository.updateKlient(klId, klData)
        .then(result => {
            res.redirect('/klient')
        }).catch(err => {
            res.render('/pages/klient/form-edit', {
                kl: klData,
                pageTitle: 'Edycja klient',
                formMode: 'edit',
                btnLabel: 'Edytuj klienta',
                formAction: '/klient/edit',
                validationErrors: err.errors
            });
        });
};

exports.deleteKlient = (req, res, next) => {
    const klId = req.params.deleteKl;
    KlientRepository.deleteKlient(klId)
        .then(() => {
            res.redirect('/klient');
        });
};

exports.showKlientDelete = (req, res, next) => {
    KlientRepository.getKlients()
        .then(kls => {
            res.render('pages/klient/list', {
                kls: kls,
                navLocation: 'kl'
            });
        });
}