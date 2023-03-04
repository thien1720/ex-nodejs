const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/stored/couse', meController.storedCouse);
router.get('/trash/couse', meController.trashCourse);



module.exports = router;
