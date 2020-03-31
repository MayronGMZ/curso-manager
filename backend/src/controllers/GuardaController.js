const generateUniqueId = require('../configs/generateUniqueId')

const conn = require('../database/connections')

module.exports = {
  async index(req, res) {
    const guardas = await conn('guarda')
      .select('*')

    return res.json(guardas)
  },

  async store(req, res) {
    const {
      nome,
      cpf,
      id_funcional,
      data_nascimento,
      endereco,
      telefone,
      email,
      curso_id,
      data_inclusao,
      observacao,
    } = req.body

    const id = generateUniqueId()

    await conn('guarda')
      .insert({
        id,
        nome,
        cpf,
        id_funcional,
        data_nascimento,
        endereco,
        telefone,
        email,
        curso_id,
        data_inclusao,
        observacao,
      })

    return res.json({ id })
  },
  async show(req, res) {
    const { id } = req.params

    const guarda = await conn('guarda')
      .where('id', id)
      .select('id', 'nome', 'cpf', 'id_funcional', 'data_nascimento',
        'endereco', 'telefone', 'email', 'curso_id', 'data_inclusao',
        'observacao')
      .first()
    
    if (guarda.id !== id) {
      return res.status(404).json({ error: 'GCM não existe.' })
    }

    return res.json(guarda)
  },

  async update(req, res) {
    const { id } = req.params
    const {
      nome,
      cpf,
      id_funcional,
      data_nascimento,
      endereco,
      telefone,
      email,
      curso_id,
      data_inclusao,
      observacao,
    } = req.body

    let guarda = await conn('guarda')
      .where('id', id)
      .select('id', 'nome', 'cpf', 'id_funcional', 'data_nascimento',
        'endereco', 'telefone', 'email', 'curso_id', 'data_inclusao',
        'observacao')
      .first()

    if (guarda.id !== id) {
      return res.status(404).json({ error: 'Cursos não existe' })
    } else {
      await conn('guarda')
        .where('id', id)
        .update({
          nome,
          cpf,
          id_funcional,
          data_nascimento,
          endereco,
          telefone,
          email,
          curso_id,
          data_inclusao,
          observacao,
        })
    }

    guarda = await conn('guarda')
      .where('id', id)
      .select('id', 'nome', 'cpf', 'id_funcional', 'data_nascimento',
        'endereco', 'telefone', 'email', 'curso_id', 'data_inclusao',
        'observacao')

    return res.json(guarda)
  },

  async destroy(req, res) {
    const { id } = req.params

    try {
      const guarda = await conn('guarda')
      .where('id', id)
      .select('id')
      .first()

      if(guarda.id !== id) {
        return
      }

      await conn('guarda')
        .where('id', id)
        .delete()

      return res.status(204).send()  
    } catch (error) {
      return res.status(404).json({ error: 'ID não encontrado.' })
    }    
  }
}