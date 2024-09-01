const db = require('../models');

exports.addRoute = async (req, res) => {
  try {
    const { from, to, departureTime } = req.body;

    const route = await db.Route.create({
      from,
      to,
      departureTime
    });

    res.status(201).json(route);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllRoutes = async (req, res) => {
  try {
    const routes = await db.Route.findAll();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getRoute = async (req, res) => {
  try {
    const routeId = req.params.route_id;

    const route = await db.Route.findByPk(routeId);
    if (!route) return res.status(404).json({ message: 'Route not found' });

    res.json(route);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateRoute = async (req, res) => {
  try {
    const routeId = req.params.route_id;

    const route = await db.Route.findByPk(routeId);
    if (!route) return res.status(404).json({ message: 'Route not found' });

    Object.assign(route, req.body);
    await route.save();

    res.json(route);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteRoute = async (req, res) => {
  try {
    const routeId = req.params.route_id;

    const route = await db.Route.findByPk(routeId);
    if (!route) return res.status(404).json({ message: 'Route not found' });

    await route.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
