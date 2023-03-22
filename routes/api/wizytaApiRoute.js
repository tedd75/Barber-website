const express = require('express');
const router = express.Router();

const wizyApiController = require('../../api/WizytaAPI');

router.get('/', wizyApiController.getWizyta);
router.get('/:wizyId', wizyApiController.getWizytaById);
router.post('/', wizyApiController.createWizyta);
router.put('/:wizyId', wizyApiController.updateWizyta);
router.delete('/:wizyId', wizyApiController.deleteWizyta);

module.exports = router;