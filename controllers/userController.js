const db = require('../models');

exports.getUser = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await db.User.findByPk(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (email) user.email = email;
    if (name) user.name = name;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
