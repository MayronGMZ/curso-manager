const { Router } = require('express')

const CursoController = require('./controllers/CursoController')
const GuardaController = require('./controllers/GuardaController')
const DisciplinaController = require('./controllers/DisciplinaController')
const InstrutorController = require('./controllers/InstrutorController')

const routes = Router()

// ROTAS

// Cursos
routes.get('/cursos', CursoController.index)
routes.post('/cursos', CursoController.store)
routes.get('/cursos/:id', CursoController.show)
routes.put('/cursos/:id', CursoController.update)
routes.delete('/cursos/:id', CursoController.destroy)

// Guardas
routes.get('/guardas', GuardaController.index)
routes.post('/guardas', GuardaController.store)
routes.get('/guardas/:id', GuardaController.show)
routes.put('/guardas/:id', GuardaController.update)
routes.delete('/guardas/:id', GuardaController.destroy)

// Disciplinas
routes.get('/disciplinas', DisciplinaController.index)
routes.post('/disciplinas', DisciplinaController.store)
routes.get('/disciplinas/:id', DisciplinaController.show)
routes.put('/disciplinas/:id', DisciplinaController.update)
routes.delete('/disciplinas/:id', DisciplinaController.destroy)

// Instrutores
routes.get('/instrutores', InstrutorController.index)
routes.post('/instrutores', InstrutorController.store)
routes.get('/instrutores/:id', InstrutorController.show)
routes.put('/instrutores/:id', InstrutorController.update)
routes.delete('/instrutores/:id', InstrutorController.destroy)

module.exports = routes