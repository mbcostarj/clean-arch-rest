import jwt from 'jsonwebtoken';
import { ITokenService } from "../../../domain/services/itoken-service";

export class JwtService implements ITokenService {
  constructor(private readonly jwtSecret: string){}

  sign(payload: object): string{
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
  }
}