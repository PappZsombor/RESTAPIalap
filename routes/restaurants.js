const express = require("express");
const router = express.Router();
const restaurantModel = require("../models/restaurant");

//létrehozás
router.post('/', async (req, res) => {
  const data = new restaurantModel(req.body);
  try {
    const dataToSave = await data.save();
    res.status(201).json(dataToSave)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//összes lekérdezése
router.get('/', async (req, res) => {
  try {
    const data = await restaurantModel.find();
    res.json(data)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//lekérdezés étterem név alapján
router.get('/:restaurant', async (req, res) => {
  try {
    const data = await restaurantModel.findById(req.params.restaurant);
    res.json(data)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
});

//változtatás étterem név alapján
router.patch('/:restaurant', async (req, res) => {
  try {
    const restaurant = req.params.restaurant;
    const updatedData = req.body;
    const options = { new: true };
    const result = await restaurantModel.findByIdAndUpdate(
      restaurant, updatedData, options
    )
    res.send(result)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//törlés étterem név alapján
router.delete('/:restaurant', async (req, res) => {
  try {
  const restaurant = req.params.restaurant;
  const data = await restaurantModel.findByIdAndDelete(restaurant)
  res.send(`Document with ${data.name} has been deleted..`)
  }
  catch (error) {
  res.status(400).json({ message: error.message })
  }
  })

module.exports = router;