const db = require('../models');

exports.addBus = async (req, res) => {
  try {
    const bus = await db.Bus.create(req.body);
    res.status(201).json(bus);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllBuses = async (req, res) => {
  try {
    const buses = await db.Bus.findAll();
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBus = async (req, res) => {
  try {
    const bus = await db.Bus.findByPk(req.params.bus_id);
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateBus = async (req, res) => {
  try {
    const bus = await db.Bus.findByPk(req.params.bus_id);
    if (!bus) return res.status(404).json({ message: 'Bus not found' });

    Object.assign(bus, req.body);
    await bus.save();
    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteBus = async (req, res) => {
  try {
    const bus = await db.Bus.findByPk(req.params.bus_id);
    if (!bus) return res.status(404).json({ message: 'Bus not found' });

    await bus.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
