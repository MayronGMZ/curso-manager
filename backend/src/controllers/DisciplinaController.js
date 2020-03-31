const generateUniqueId = require('../configs/generateUniqueId')

const conn = require('../database/connections')

module.exports = {
  async index(req, res) {
    const disciplinas = await conn('disciplina')
      .select('*')

    return res.json(disciplinas)
  },

  async store(req, res) {
    const { nome, instrutor_id, curso_id, carga_horaria } = req.body

    const id = generateUniqueId()

    await conn('disciplina')
      .insert({
        id,
        nome,
        instrutor_id,
        curso_id,
        carga_horaria
      })

    return res.status(201).json({ id })
  },

  async show(req, res) {
    const { id } = req.params

    const disciplina = await conn('disciplina')
      .where('id', id)
      .select('id', 'nome', 'instrutor_id', 'carga_horaria')
      .first()

    if (disciplina.id !== id) {
      return res.status(401).json({ error: 'Operation not permitted.' })
    }

    return res.json(disciplina)
  },

  async update(req, res) {
    const { id } = req.params
    const { nome, instrutor_id, curso_id, carga_horaria } = req.body

    let disciplina = await conn('disciplina')
      .where('id', id)
      .select('id', 'nome', 'instrutor_id', 'carga_horaria')
      .first()
    
    if (disciplina.id !== id) {
      return res.status(401).json({ error: 'Operation not permitted.' })
    } else {
      await conn('disciplina')
        .where('id', id)
        .update({
          nome,
          instrutor_id,
          curso_id,
          carga_horaria
        })
    }

    disciplina = await conn('disciplina')
      .where('id', id)
      .select('id', 'nome', 'instrutor_id', 'curso_id', 'carga_horaria')
      .first()

    return res.json(disciplina)
  },

  async destroy(req, res) {
    const { id } = req.params

    const disciplina = await conn('disciplina')
      .where('id', id)
      .select('id')
      .first()
    
    if (disciplina.id !== id) {
      return res.status(401).json({ error: 'Operation not permitted.' })
    }

    await conn('disciplina')
      .where('id', id)
      .delete()

    return res.status(204).send()
  }
}