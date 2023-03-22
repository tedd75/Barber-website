const Klient = require('../model/sequelize/Klient');
const WizytaRepository = require('../repository/sequelize/WizytaRepository');
const KlientRepository = require('../repository/sequelize/KlientRepository');
const UslugaRepository = require('../repository/sequelize/UslugaRepository');

exports.showWizytaList = (req, res, next) => {
    WizytaRepository.getWizytas()
        .then(wizys => {
            res.render('pages/wizyta/list', {
                wizys: wizys,
                navLocation: 'wizy'
            });
        });
}

exports.showAddWizytaForm = (req, res, next) => {
    let allKls, allUslus;
    KlientRepository.getKlients()
        .then(kls => {
            allKls = kls;
            return UslugaRepository.getUslugas();
        })
        .then(uslus => {
            allUslus = uslus;
            res.render('pages/wizyta/form', {
                wizyta: {},
                formMode: 'createNew',
                allKls: allKls,
                allUslus: allUslus,
                pageTitle: 'Nowa wizyta',
                btnLabel: 'Dodaj wizyte',
                formAction: '/wizyta/add',
                navLocation: 'wizyta',
                validationErrors: []
            });
        });

}

exports.showWizytaDetails = (req, res, next) => {
    const wizyId = req.params.wizyId;
    let allKls, allUslus;

    KlientRepository.getKlients()
        .then(kl => {
            allKls = kl;
            return UslugaRepository.getUslugas();
        })
        .then(uslu => {
            allUslus = uslu;
            return WizytaRepository.getWizytaById(wizyId);
        })
        .then(wizyta => {
            console.log(wizyta);
            res.render('pages/wizyta/szczegoly-wizyt', {
                wizyta: wizyta,
                formMode: 'showDetails',
                allKls: allKls,
                allUslus: allUslus,
                pageTitle: 'Szczegóły wizyty',
                formAction: '',
                navLocation: 'wizyta',
                validationErrors: []
            });
        });
}

exports.showWizytaEdit = (req, res, next) => {
    const wizyId = req.params.wizyId;
    let allKls, allUslus;

    KlientRepository.getKlients()
        .then(kl => {
            allKls = kl;
            return UslugaRepository.getUslugas();
        })
        .then(uslu => {
            allUslus = uslu;
            return WizytaRepository.getWizytaById(wizyId);
        })
        .then(wizyta => {
            console.log(wizyta);
            res.render('pages/wizyta/edit-wizyta', {
                wizyta: wizyta,
                formMode: 'edit',
                allKls: allKls,
                allUslus: allUslus,
                pageTitle: 'Edycja wizyty',
                formAction: '',
                navLocation: 'wizyta',
                validationErrors: []
            });
        });
}

exports.addWizyta = (req, res, next) => {
    const wizyData = { ...req.body };

    let allKls, allUslus;
    WizytaRepository.createWizyta(wizyData)
        .then(result => {
            res.redirect('/wizyta');
        })
        .catch(err => {
            console.log(wizyData);
            KlientRepository.getKlients()
                .then(kl => {
                    allKls = kl;
                    return UslugaRepository.getUslugas();
                })
                .then(uslu => {
                    allUslus = uslu;
                })
                .then(() => {
                    res.render('pages/wizyta/form', {
                        wizyta: wizyData,
                        pageTitle: 'Dodawanie wizyty',
                        formMode: 'createNew',
                        allKls: allKls,
                        allUslus: allUslus,
                        btnLabel: 'Dodaj wizyte',
                        formAction: '/wizyta/add',
                        navLocation: 'wizyta',
                        validationErrors: err.errors
                    });
                });
        });
};


exports.updateWizyta = (req, res, next) => {
    const wizyId = req.body._id;
    const wizyData = { ...req.body };

    WizytaRepository.updateWizyta(wizyId, wizyData)
        .then(result => {
            res.redirect('/wizyta');
        })
        .catch(err => {
            KlientRepository.getKlients()
                .then(kl => {
                    allKls = kl;
                    return UslugaRepository.getUslugas();
                })
                .then(uslu => {
                    allUslus = uslu;
                }).catch(err => {
                    res.render('/pages/wizyta/form', {
                        kl: klData,
                        pageTitle: 'Edycja wizyta',
                        formMode: 'edit',
                        btnLabel: 'Edytuj wizyte',
                        formAction: '/wizyta/add',
                        validationErrors: err.errors
                    });
                });

        });
}

exports.deleteWizyta = (req, res, next) => {
    const wizyId = req.params.deleteWizy;
    WizytaRepository.deleteWizyta(wizyId)
        .then(() => {
            res.redirect('/wizyta');
        })
};

exports.showWizytaDelete = (req, res, next) => {
    res.render('pages/wizyta/usun-wizyte', { navLocation: 'wizy' });
}