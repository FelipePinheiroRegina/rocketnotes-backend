const knex = require('../database/knex')
const  appError = require('../utils/appError')
const  DiskStorage = require('../providers/DiskStorage')

class UserAvatarController {
    async update(request, response) {
        const user_id = request.user.id // pegando do middleware, ele está interceptando a requisição, vendo se o usuario é autenticado e ai sim mandando para cá
        const avatarFilename = request.file.filename

        const diskStorage = new DiskStorage()

        const user = await knex("users")
        .where({ id: user_id}).first()

        if(!user) {
            throw new appError('Only authenticated users can change avatar')
        }

        if(user.avatar) {
            await diskStorage.deleteFile(user.avatar)
        }

        const filename = await diskStorage.saveFile(avatarFilename)
        user.avatar = filename

        await knex('users').update(user).where({ id: user_id})

        return response.json(user)
    }
}

module.exports = UserAvatarController