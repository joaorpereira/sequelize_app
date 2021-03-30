import ManagerAuth from '../middlewares/ManagerAuth';
import ManagerPassword from '../middlewares/ManagerPassword';
import model from '../models';

const { User } = model;

class UserController {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).send({ message: 'Email ou senha incorretos.' });
    }

    const comparePassword = await ManagerPassword.comparePassword(password, user.password);

    if (!comparePassword) {
      return res.status(401).send({ message: 'Email ou senha incorretos.' });
    }

    const token = ManagerAuth.generateToken({ id: user.id });

    if (!token) {
      return res.status(401).send({ message: 'Falha ao realizar o login.' });
    }

    return res.status(201).send({ token, message: 'Usuário logado com sucessso' });
  }
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

    const token = ManagerAuth.generateToken({ id: user.id });

    if (!token) {
      return res.status(401).send({ message: 'Não autorizado.' });
    }

    return res.status(201).send({ user, token, message: 'Usuário cadastrado com sucesso.' });
  }
  async update(req, res) {
    const { name, email, password } = req.body;
    const { user_id } = req.params;
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({ message: 'Não autorizado.' });
    }

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
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({ message: 'Não autorizado.' });
    }

    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).send({ message: 'Campo obrigatório: id' });
    }

    const user = await User.findOne({ where: { id: user_id } });

    if (!user) {
      return res.status(400).send({ message: 'Usuário não encontrado.' });
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
