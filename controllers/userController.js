const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = `Mys3c123T`;

exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({ message: 'Registration successful', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

    exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
        return res.status(401).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };


    exports.getProfile = async (req, res) => {
        try {
          // Extract the token from the request headers
          const token = req.headers.authorization;
      
          if (!token) {
            return res.status(401).json({ message: 'Token is missing' });
          }
      
          // Verify the token and extract the user ID
          jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
              return res.status(401).json({ message: 'Invalid token' });
            }
      
            const userId = decoded.userId;
      
            // Find the user by ID
            const user = await User.findById(userId);
      
            if (!user) {
              return res.status(404).json({ message: 'User not found' });
            }
      

            const userProfile = {
              username: user.username,
              email: user.email,
            };
      
            res.status(200).json(userProfile);
          });
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
    };

    exports.rentCar = async (req, res) => {
        try {
          const token = req.headers.authorization;
      
          if (!token) {
            return res.status(401).json({ message: 'Token is missing' });
          }

          jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
              return res.status(401).json({ message: 'Invalid token' });
            }
      
            const userId = decoded.userId;
            const user = await User.findById(userId);
      
            if (!user) {
              return res.status(404).json({ message: 'User not found' });
            }
      
            const { idCars, brand, type, duration } = req.body;
      
            // Check car availability (you will need to implement this logic)
            const car = await Car.findById(idCars);
            if (!car || !car.isAvailable) {
              return res.status(400).json({ message: 'Car not available for rent' });
            }
      
            // Create a booking (you will need to implement this logic)
            const booking = new Booking({
              userId,
              carId: idCars,
              brand,
              type,
              duration
            });
            await booking.save();
      
            // Update car availability 
            car.isAvailable = false;
            await car.save();

            res.status(200).json({ message: 'Car rental successful', booking });
          });
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      };
      