const { error } = require('console');
const restaurantModel = require('../models/restaurant.model');

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
    } catch (error) {
        console.log(error)
    }
};

exports.getRestaurantById = async(req, res, next) => {
    //restaurantModel.findById(req.params.id);
    try {
        const restaurants = await restaurantModel.findById({});
        res.status(200).json(restaurants);
    } catch (error) {
        console.log(error)
    }
};

exports.updateRestaurant = async(req, res, next) => {
    restaurantModel.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        useFindAndModify: false
    })
    try {
        const restaurants = await restaurantModel.findByIdAndUpdate({});
        res.status(200).json(restaurants);
    } catch (error) {
        console.log(error)
    }
};

exports.deleteRestaurant = async(req, res, next) => {
    try {
        const restaurants = await restaurantModel.findByIdAndDelete({});
        res.status(200).json(restaurants);
    } catch (error) {
        console.log(error)
    }
};
