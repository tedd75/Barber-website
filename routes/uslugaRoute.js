const express = require('express');
const router = express.Router();
const uslugaControler = require('../controllers/uslugaController');
router.get('/', uslugaControler.showUslugaList);
router.get('/add', uslugaControler.showAddUslugaForm);
router.get('/details/:usluId', uslugaControler.showUslugaDetails);
router.get('/edit/:usluId', uslugaControler.showUslugaEdit);
router.get('/delete/:usluId', uslugaControler.showUslugaDelete);
router.post('/add', uslugaControler.addUsluga);
router.post('/edit', uslugaControler.updateUsluga);
router.get('/delete/:usluId', uslugaControler.deleteUsluga);
module.exports = router;