import { User } from "../entities/user";

export interface IUserRepository{
  findByEmail(email: string): Promise<User | null>;
  findByPhone(phone: string): Promise<User | null>;
  save(user: User): Promise<void>;
  list(): Promise<User[]>;
}