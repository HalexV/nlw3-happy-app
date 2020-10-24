const express = require('express');
const path = require('path');
const pages = require('./pages');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const administrationRoutes = require('./routes/administration');

const { loadSettings } = require('./middleware/loadSettingsMiddleware');

const server = express();

server
// utilizar body do req
.use(express.urlencoded({ extended: true }))
.use(express.json())
// utilizando os arquivos estáticos
.use(express.static('public'))
// carregar o settings em todas as rotas
.use(cookieParser())
.use(loadSettings)
.use(checkUser)
// configurar template engine
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'hbs')

// rotas da aplicação
.get('/', pages.index)
.get('/orphanage', pages.orphanage)
.get('/orphanages', pages.orphanages)
.get('/login', pages.login)
.get('/logout', requireAuth, pages.logout)
.post('/login', pages.login)
.use('/administration', requireAuth, administrationRoutes)

server.listen(5500);