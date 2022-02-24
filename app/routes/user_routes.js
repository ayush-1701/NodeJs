const express = require('express')
const router = express.Router()

const UserAuth = require('../Services/auth/auth')
const UserController = require('../controllers/user_controller')

router.post('/signup',UserController.signup)
router.post('/login',UserController.login)
router.get('/all',[UserAuth.verifyToken],UserController.getAll)
router.get('/:id',[UserAuth.verifyToken],UserController.getById)
router.put('/:id',[UserAuth.verifyToken],UserController.updateById)
router.delete('/:id',[UserAuth.verifyToken],UserController.deleteById)
router.put('/:id/changepassword',[UserAuth.verifyToken],UserController.updatePassword)

module.exports = router