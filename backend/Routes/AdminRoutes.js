const router = require('express').Router();
const {LoginAdmin,RegisterAdmin, LoadAdmin,logout} = require('../Controllers/AdminController');
const {authenticate} = require('../Middlewares/Auth');

router.route('/AdminRegister').post(RegisterAdmin);
router.route('/AdminLogin').post(LoginAdmin);
router.route('/LogoutAdmin').get(logout);
router.route('/LoadAdmin').get(authenticate,LoadAdmin);


module.exports = router;