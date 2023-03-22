const KlientRepository = require('../repository/sequelize/KlientRepository');


exports.login = (req, res, next) => {
    const lastName = req.body.lastName;
    const password = req.body.password;
    KlientRepository.findByLastName(lastName)
        .then(kl => {
            if (!kl) {
                res.render('index', {
                    navLocatioon: '',
                    loginError: "Nieprawidlowy login lub haslo"
                })
            } else if (authUtil.comparePasswords(password, kl.password) === true) {
                req.session.loggedUser = kl;
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidlowy login lub haslo"
                })
            }
        })
        .catch(err => {
            console.log(err);

        });
}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/')
}