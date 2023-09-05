const express = require('express');
const router = express.Router();
const carsController = require('../controllers/carsController.js');
const loggingMiddleware = require('../middlewares/logger.js');
const checkRole = require('../middlewares/roleMiddleware.js');


router.use(loggingMiddleware);

router.get('/cars', carsController.getAllCars);
router.post('/cars', checkRole('admin'), carsController.createCars);
router.get('/cars', carsController.getCarsById);
router.put('/cars/:id', checkRole('admin'), carsController.updateCarsById);
router.delete('/cars/:id', checkRole('admin'), carsController.deleteCarsById);

module.exports = router;