const express = require('express');
const path = require('path');
const pages = require('./pages');

const server = express();

server
// utilizar body do req
.use(express.urlencoded({ extended: true }))
// utilizando os arquivos estáticos
.use(express.static('public'))
// configurar template engine
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'hbs')

// rotas da aplicação
.get('/', pages.index)
.get('/orphanage', pages.orphanage)
.get('/orphanages', pages.orphanages)
.get('/create-orphanage', pages.createOrphanage)
.get('/edit-orphanage', pages.editOrphanage)
.get('/delete-orphanage', pages.deleteOrphanage)
.get('/administration', pages.administration)
.get('/settings', pages.settings)
.post('/settings', pages.settings)
.post('/save-orphanage', pages.saveOrphanage)
.post('/edit-orphanage', pages.editOrphanage)

server.listen(5500);