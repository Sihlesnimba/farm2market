import express from 'express';
import Market from '../models/Market.js'; // Make sure this path is correct
const router = express.Router();

// GET all markets
router.get('/', async (req, res) => {
  try {
    const markets = await Market.find().sort({ createdAt: -1 }); // Sort by newest first
    res.json(markets);
  } catch (err) {
    console.error('Error fetching markets:', err.message);
    res.status(500).json({ message: 'Error fetching markets' });
  }
});

// POST new market
router.post('/', async (req, res) => {
  try {
    const { name, location, product } = req.body;
    const newMarket = new Market({ name, location, product });
    const savedMarket = await newMarket.save();
    res.status(201).json(savedMarket);
  } catch (err) {
    console.error('Error saving market:', err.message);
    res.status(500).json({ message: 'Error saving market' });
  }
});

// DELETE a market by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMarket = await Market.findByIdAndDelete(id);
    if (!deletedMarket) {
      return res.status(404).json({ message: 'Market not found' });
    }
    res.status(200).json({ message: 'Market deleted successfully' });
  } catch (err) {
    console.error('Error deleting market:', err.message);
    res.status(500).json({ message: 'Server error deleting market' });
  }
});

export default router;
