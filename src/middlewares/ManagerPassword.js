import * as bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

class ManagerPassword {
  async comparePassword(text, cryptText) {
    return bcrypt.compare(text, cryptText);
  }
}

export default new ManagerPassword();
