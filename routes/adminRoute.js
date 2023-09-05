const express = require('express');
const router = express.Router();
const carsController = require('../controllers/carsController.js');
const loggingMiddleware = require('../middleware/loggingMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');


router.use(loggingMiddleware);

router.get('/cars', carsController.getAllCars);
router.post('/cars', roleMiddleware('admin'), carsController.createCars);
router.get('/cars', carsController.getCarsById);
router.put('/cars/:id', roleMiddleware('admin'), carsController.updateCarsById);
router.delete('/cars/:id', roleMiddleware('admin'), carsController.deleteCarsById);

module.exports = router;