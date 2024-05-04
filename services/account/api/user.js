const express = require('express');
const { USERS_TABLE } = require('./db'); // Make sure to adjust the required path based on actual file location

const router = express.Router();

// Retrieve user by user ID
router.get('/user/:username', (req, res) => {
    const { username } = req.params;
    if (!username) {
        return res.status(400).send('username is required');
    }
    const user = USERS_TABLE[username];
    if (user) {
        return res.json({ name: user.name, isAdmin: user.isAdmin, username: user.username });
    }
    return res.status(404).send('User not found');
});

// List all users
router.get('/users', (req, res) => {
    const userList = Object.values(USERS_TABLE).map(user => ({
        id: user.id,
        name: user.name,
        username: user.username,
        isAdmin: user.isAdmin
    }));
    res.json({ users: userList });
});

module.exports = router;