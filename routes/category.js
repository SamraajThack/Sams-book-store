const express = require('express');
const router = express.Router();

const { create, categoryById } = require('../controllers/category');
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");


//router
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);


//router.param('categoryId', categoryById);
router.param('userId', userById);


module.exports = router; 