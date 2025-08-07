import { PrismaClient} from "@prisma/client";
import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../../domain/repositories/iuser";

export class UserRepositoryPrisma implements IUserRepository{
  
  private constructor(private readonly prisma: PrismaClient){}

  public static create(prisma: PrismaClient) {
      return new UserRepositoryPrisma(prisma);
  }
  
  public async findByEmail(email: string): Promise<User | null> {
    const data = await this.prisma.user.findUnique({ where: { email } });
    if(!data) return null;
    return User.with(data);
  }

  public async findByPhone(phone: string): Promise<User | null>{
    const data = await this.prisma.user.findUnique({ where: {phone} });
    if(!data) return null;
    return User.with(data);
  }

  public async save(user: User): Promise<void> {

    const data = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password
    }
    
    await this.prisma.user.create({ data });

  }

  public async  list(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    const userList = users.map((u)=>{
      const user = User.with({
        id: u.id,
        name: u.name,
        email: u.email,
        phone: u.phone,
        password: u.password
      });

      return user;
    });

    return userList;
  }

}