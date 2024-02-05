const router = require('express').Router();
const {RegisterUser,LoginUser,logout,LoadUser,UpdateUserDetails,GetAllUsers} = require('../Controllers/UserController');
const {authenticate} = require('../Middlewares/Auth');

router.route('/Register').post(RegisterUser);
router.route('/Login').post(LoginUser);
router.route('/Logout').get(logout);
router.route('/LoadUser').get(authenticate,LoadUser);
router.route('/SaveUser/:userID').put(authenticate,UpdateUserDetails);
router.route('/AllCustomers').get(GetAllUsers);

module.exports = router;