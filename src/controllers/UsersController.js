const appError = require('../utils/appError')
const sqliteConnection = require('../database/sqlite')
const { hash, compare } = require('bcryptjs')


class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body

        const database=  await sqliteConnection()
       
        const userExists = await database.get('SELECT * FROM users WHERE email = (?)', [email])

        if(userExists){
            throw new appError('This e-mail already exists')
        }

        const hashPassword = await hash(password, 8)

        await database.run('INSERT INTO users(name, email, password) VALUES(?, ?, ?)', [name, email, hashPassword])

        return response.status(201).json()
    }

    async update(request, response) {
        const { name, email, oldPassword, newPassword} = request.body
        const user_id = request.user.id

        const database = await sqliteConnection()

        const user = await database.get('SELECT * FROM users WHERE id = (?)', [user_id])

        if(!user) {
            throw new appError('User not found')
        }

        const userWithUpdateEmail = await database.get('SELECT * FROM users WHERE email = (?)', [email])

        if(userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
            throw new appError('This E-mail already exists')
        }

        user.name  = name ?? user.name
        user.email = email ?? user.email

        if(newPassword && !oldPassword){
            throw new appError('You need to enter your old password');
        }

        if(newPassword && oldPassword){
            const checkOldPassword = await compare(oldPassword, user.password)

            if(!checkOldPassword){
                throw new appError('Password invalid')
            }

            user.password = await hash(newPassword, 8)
        }
        
        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now','localtime')
            WHERE id = (?)
        `, [user.name, user.email, user.password, user_id])

        return response.status(200).json()
    }
}

module.exports = UsersController