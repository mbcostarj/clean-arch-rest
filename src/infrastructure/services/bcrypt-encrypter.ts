import bcrypt from "bcrypt";
import { IEncrypter } from "../../domain/services/iencrypter";

export class BcryptEncrypter implements IEncrypter {
  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, 10)
  }
  async compare(plain: string, hashed: string): Promise<boolean>{
    return bcrypt.compare(plain, hashed);
  }
}