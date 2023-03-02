var express = require('express');

var userController = require('../src/user/userController');
const router = express.Router();

router.route('/user/list').get(userController.listUserControllerFunc);
// ruta para login
router.route('/user/login').post(userController.loginUserControllerFunc);
// ruta para crear usuario
router.route('/user/create').post(userController.createUserControllerFunc);

router.route('/user/search/:email').get(userController.searchUserControllerFunc);

router.route('/user/update/:email').put(userController.updateUserControllerFunc)

router.route('/user/delete/:email').delete(userController.deleteUserControllerFunc);

module.exports = router;
