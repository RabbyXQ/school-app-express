const express = require('express');
const patronController = require('../controllers/patronControllers');

const router = express.Router();

router.post('/patrons', patronController.addPatron);
router.get('/patrons/:id', patronController.getPatronByID);
router.put('/patrons/:id', patronController.updatePatron);
router.delete('/patrons/:id', patronController.deletePatron);
router.get('/patrons', patronController.getAllPatrons);
router.get('/patrons/active/:type', patronController.getActivePatron);
module.exports = router;
