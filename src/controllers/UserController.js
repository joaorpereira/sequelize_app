import model from '../models';

const { User } = model;

class UserController {
  async index(req, res) {
    const users = await User.findAll();

    if (users === '' || users === null) {
      return res.status(200).send({ message: 'Nenhum usuário cadastrado.' });
    }

    return res.status(200).send({ users });
  }
  async store(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({ message: 'Campos obrigatórios: nome, email e senha.' });
    }

    const user = await User.create({ name, email, password });

    return res.status(201).send({ user, message: 'Usuário cadastrado com sucesso.' });
  }
  async update(req, res) {
    const { name, email, password } = req.body;
    const { user_id } = req.params;

    if (!name || !email || !password || !user_id) {
      return res.status(400).send({ message: 'Campos obrigatórios: id, nome, email e senha.' });
    }

    await User.update(
      { name, email, password },
      {
        where: {
          id: user_id,
        },
      },
    );

    return res.status(201).send({ message: 'Usuário atualizado com sucesso.' });
  }
  async delete(req, res) {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).send({ message: 'Campo obrigatório: id' });
    }

    await User.destroy({
      where: {
        id: user_id,
      },
    });

    return res.status(201).send({ message: 'Usuário removido com sucesso.' });
  }
}

export default new UserController();
