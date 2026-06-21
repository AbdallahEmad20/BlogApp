const express = require('express');
const {Register} = require('../controllers/auth');
const { Login } = require('../controllers/auth');
const router  =  express.Router();

router.post("/register" ,   Register)

router.post("/login" ,    Login)
 
module.exports = router