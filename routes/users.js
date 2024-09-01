const express = require('express');
const router = express.Router();
const { getUser, updateUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getUser);
router.put('/', authMiddleware, updateUser);

module.exports = router;
