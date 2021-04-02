import model from '../models';

const { User, Course } = model;

class CourseController {
  async index(req, res) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({ message: 'Não autorizado.' });
    }
    const { user_id } = req.params;
    const user = await User.findByPk(user_id, {
      include: {
        association: 'courses',
        through: {
          attributes: [],
        },
      },
    });

    if (!user) {
      return res.status(400).send({ message: 'Curso não encontrado.' });
    }

    return res.status(201).send({ user, message: 'Curso encontrado com sucessso' });
  }
  async store(req, res) {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).send({ message: 'Não autorizado.' });
      }
      const { user_id } = req.params;
      const { name } = req.body;

      const user = await User.findByPk(user_id);

      if (!user) {
        return res.status(404).send({ message: 'Usuário não encontrado.' });
      }

      const [course] = await Course.findOrCreate({
        where: name,
      });

      await user.addCourse(course);

      return res
        .status(201)
        .send({ courses: user.courses, message: 'Curso cadastrado com sucessso' });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }
  // async update(req, res) {}
  async delete(req, res) {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).send({ message: 'Não autorizado.' });
      }
      const { user_id } = req.params;
      const { name } = req.body;

      const user = await User.findOne({ where: { id: user_id } });

      if (!user) {
        return res.status(400).send({ message: 'Usuário não encontrado.' });
      }

      const course = await Course.findOrCreate({
        where: { name },
      });

      await user.removeCourse(course);
      return res.status(201).send({ message: 'Curso removido com sucesso.' });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }
}

export default new CourseController();
