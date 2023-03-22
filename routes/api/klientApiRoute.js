const express = require('express');
const router = express.Router();

const klApiController = require('../../api/KlientAPI');

router.get('/', klApiController.getKlients);
router.get('/:klId', klApiController.getKlientById);
router.post('/', klApiController.createKlient);
router.put('/:klId', klApiController.updateKlient);
router.delete('/:klId', klApiController.deleteKlient);

module.exports = router;
