const generateUniqueId = require('../configs/generateUniqueId')

const conn = require('../database/connections')

module.exports = {
  async index(req, res) {
    const instrutores = await conn('instrutor').select('*')

    return res.json(instrutores)
  },

  async store(req, res) {
    const { nome, cpf, endereco, telefone, email } = req.body

    const id = generateUniqueId()

    await conn('instrutor').insert({
      id,
      nome,
      cpf,
      endereco,
      telefone,
      email,
    })

    return res.status(201).json({ id })
  },

  async show(req, res) {
    const { id } = req.params

    const instrutor = await conn('instrutor')
      .where('id', id)
      .select('id','nome', 'cpf', 'endereco', 'telefone', 'email')
      .first()

    if (instrutor.id !== id) {
      return res.status(401).json({ error: 'Operation not permitted.' })
    }

    return res.json(instrutor)
  },

  async update(req, res) {
    const { id } = req.params
    const { nome, cpf, endereco, telefone, email } = req.body

    let instrutor = await conn('instrutor')
      .where('id', id)
      .select('id','nome', 'cpf', 'endereco', 'telefone', 'email')
      .first()

    if (instrutor.id !== id) {
      return res.status(401).json({ error: 'Operation not permitted.' })
    } else {
      await conn('instrutor')
        .where('id', id).update({
          nome,
          cpf,
          endereco,
          telefone,
          email,
        })

        instrutor = await conn('instrutor')
          .where('id', id)
          .select('nome', 'cpf', 'endereco', 'telefone', 'email')
          .first()
      }
      
      return res.json(instrutor)
  },

  async destroy(req, res) {
    const { id } = req.params

    const instrutor = await conn('instrutor')
      .where('id', id)
      .select('id')
      .first()

    if (instrutor.id !== id) {
      return res.status(401).json({ error: 'Operation not permitted.' })
    }

    await conn('instrutor')
      .where('id', id)
      .delete()

    return res.status(204).send()
  }
}