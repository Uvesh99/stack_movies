const express = require('express');
const { registerUser, loginUser, getUsers, getUser, updateUser, deleteUser, getUserProfiles } = require('../controllers/user.js');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get("/profile/:id",getUserProfiles);
module.exports = router;
