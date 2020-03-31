const generateUniqueId = require('../configs/generateUniqueId')

const conn = require('../database/connections')

module.exports = {
  async index(req, res) {
    const cursos = await conn('curso')
      .select('*')

    return res.json(cursos)
  },

  async store(req, res) {
    const { nome, duracao, modalidade, turno, local } = req.body

    const id = generateUniqueId()

    await conn('curso')
      .insert({
        id,
        nome,
        duracao,
        modalidade,
        turno,
        local
      })

    return res.status(201).json({ id })
  },

  async show(req, res) {
    const { id } = req.params

    const curso = await conn('curso')
      .where('id', id)
      .select('id', 'nome', 'duracao', 'modalidade', 'turno', 'local')
      .first()

    if (curso.id !== id) {
      return res.status(404).json({ error: 'Cursos não existe.' })
    }

    return res.json(curso)
  },

  async update(req, res) {
    const { id } = req.params
    const { nome, duracao, modalidade, turno, local } = req.body

    let curso = await conn('curso')
      .where('id', id)
      .select('id', 'nome', 'duracao', 'modalidade', 'turno', 'local')
      .first()

    if (curso.id !== id) {
      return res.status(404).json({ error: 'Curso não existe.' })
    } else {
      await conn('curso')
        .where('id', id)
        .update({
          nome,
          duracao,
          modalidade,
          turno,
          local,
      })

      instrutor = await conn('curso')
        .where('id', id)
        .select('nome', 'duracao', 'modalidade', 'turno', 'local')
    }

    return res.json(instrutor)
  },

  async destroy(req, res) {
    const { id } = req.params

    const curso = await conn('curso')
      .where('id', id)
      .select('id')
      .first()

    if (curso.id !== id) {
      return res.status(404).json({ error: 'Curso não existe.' })
    }

    await conn('curso')
      .where('id', id)
      .delete()

    return res.status(204).send()
  }
}