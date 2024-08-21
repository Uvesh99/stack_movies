const express = require('express');
const {addLogin,addMin} = require("../controllers/admin.js");


const router = express.Router();

router.post("/signup",addMin);
router.post("/login",addLogin);

module.exports = router;

