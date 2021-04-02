import model from '../models';

const { User, Address } = model;
class AddressController {
  async index(req, res) {
    try {
      const { user_id } = req.params;

      const user = await User.findByPk(user_id, {
        include: { association: 'address' },
      });

      if (!user) {
        return res.status(404).send({ message: 'Endereço não encontrado.' });
      }

      return res.status(200).send(user);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }
  async store(req, res) {
    try {
      const { street, number, district, city } = req.body;
      const { user_id } = req.params;

      const user = await User.findByPk(user_id);

      if (!user) {
        return res.status(404).send({ message: 'Usuário não encontrado.' });
      }

      if (!street || !number || !district || !city) {
        return res
          .status(400)
          .send({ message: 'Campos obrigatórios: número, rua, bairro e cidade.' });
      }

      const address = await Address.create({
        street,
        number,
        district,
        city,
        user_id,
      });
      return res.status(200).send({ message: 'Endereço criado com sucesso.', address });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }
  async update(req, res) {
    try {
      const { street, number, district, city } = req.body;
      const { user_id } = req.params;
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).send({ message: 'Não autorizado.' });
      }

      if (!user_id) {
        return res.status(400).send({ message: 'Campo obrigatório: id.' });
      }

      await User.update(
        { street, number, district, city },
        {
          where: {
            id: user_id,
          },
        },
      );

      return res.status(201).send({ message: 'Usuário atualizado com sucesso.' });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }
  async delete(req, res) {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).send({ message: 'Não autorizado.' });
      }
      const { user_id } = req.params;

      const user = await User.findOne({ where: { id: user_id } });

      if (!user) {
        return res.status(400).send({ message: 'Usuário não encontrado.' });
      }

      await User.destroy({
        where: {
          id: user_id,
        },
      });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }
}

export default new AddressController();
