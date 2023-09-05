const express = require('express');
const userController = require('../controllers/userController');
const loggingMiddleware = require('../middleware/loggingMiddleware');

const router = express.Router();

router.use(loggingMiddleware);

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', userController.getProfile);
router.post('/rent', userController.rentCar)

module.exports = router;