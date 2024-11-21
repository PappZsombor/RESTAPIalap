const restaurantModel = require('../models/restaurant');

exports.createRestaurant = async (req, res, next) => {
    const data = new restaurantModel(req.body);
    try {
        const dataToSave = await data.save();
        res.status(201).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getRestaurant = async (req, res, next) => {
    try {
        const restaurants = await restaurantModel.find({});
        res.status(200).json(restaurants);
    } catch (err) {
        next(err);
    }
};

