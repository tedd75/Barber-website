const express = require('express');
const router = express.Router();

const usluApiController = require('../../api/UslugaAPI');

router.get('/', usluApiController.getUslugas);
router.get('/:usluId', usluApiController.getUslugaById);
router.post('/', usluApiController.createUsluga);
router.put('/:usluId', usluApiController.updateUsluga);
router.delete('/:usluId', usluApiController.deleteUsluga);

module.exports = router;