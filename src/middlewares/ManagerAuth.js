import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class GenerateAuthToken {
  generateToken(payload) {
    const newToken = jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: '24h',
    });
    return newToken;
  }

  getTokenData(token) {
    const newToken = token.split(' ')[1];
    const tokenData = jwt.verify(newToken, process.env.JWT_KEY);
    return tokenData;
  }
}

export default new GenerateAuthToken();
