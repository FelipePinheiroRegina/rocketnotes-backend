### API RESTFULL NODE.JS

Follow the architecture MVC. performs all crud operations.

Controller functions:
- Create User - await to req json `{name: "Felipe", email: "felipe@email.com", password: "123"}`
- Authenticate User - await to req json `{email: "felipe@email.com", password: "123"}`
- Update User - await to req json `{name: "FelipeUpdate", email: "felipeUpdate@email.com", OldPassword: "123", NewPassword: "456"}`
- Update Avatar - await to req multformat `key: avatar, value: file.png or file.jpg`

- Create Notes - await to req json `{ title, description, tags: ['example1', 'example2'], links: ['links1', 'links2']}`
- Index Notes  - await to req json `{title, tags}` or `{}` Index to title and tags, title or tags. Void listing all
- Show Notes   - await to req.params `api.get(/notes/:id)`
- Delete Notes - await to req.params `api.delete(/notes/:id)`

The main techs:
- nodejs
- express
- sqlite
- knex
- pm2

Steps to run this project in your machine:
```
// Open bash
git clone https://github.com/FelipePinheiroRegina/rocketnotes-backend.git

cd rocketnotes-backend

npm install && npm run dev

// using pm2 in production
npm start
```
