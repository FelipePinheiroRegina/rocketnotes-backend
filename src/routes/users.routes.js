const multer = require('multer')
const uploadConfig = require('../configs/upload')

const { Router, response } = require('express')
const usersRoutes = Router()

const UsersController = require('../controllers/UsersController')
const usersController = new UsersController()

const UserAvatarController = require('../controllers/UserAvatarController')
const userAvatarController = new UserAvatarController()

const ensureAuth = require('../middlewares/ensureAuth')
const upload = multer(uploadConfig.MULTER)

usersRoutes.post('/', usersController.create)
usersRoutes.put('/', ensureAuth, usersController.update)
usersRoutes.patch('/avatar', ensureAuth, upload.single("avatar"), userAvatarController.update)

module.exports = usersRoutes