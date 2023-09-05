const Cars = require('../models/carsModel');

exports.getAllCars = async (req, res) => {
    try {
        const cars = await Cars.find(); 
        if (cars.length > 0) {
            res.status(200).json({ "message": 'Cars found!', "data": cars });
          } else {
            res.status(404).json({ "message": 'Cars empty!' });
          }
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

exports.createCars = async (req, res) => {
  try {
    const newCar = new Cars(req.body);
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getCarsById = async (req, res) => {
    const carId = req.params.id;
    try {
      const car = await Cars.findById(carId);
      if (!car) {
        return res.status(404).json({ error: 'Car not found' });
      }
      res.status(200).json(car);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.updateCarsById = async (req, res) => {
    const carId = req.params.id;
    const updatedCarData = req.body; 
    try {
      const updatedCar = await Cars.findByIdAndUpdate(carId, updatedCarData, { new: true });
      if (!updatedCar) {
        return res.status(404).json({ error: 'Car not found' });
      }
      res.status(200).json(updatedCar);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.deleteCarsById = async (req, res) => {
    const carId = req.params.id;
    try {
      const deletedCar = await Cars.findByIdAndRemove(carId);
      if (!deletedCar) {
        return res.status(404).json({ error: 'Car not found' });
      }
      res.status(200).json(deletedCar);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

