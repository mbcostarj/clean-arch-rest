import { PrismaClient } from "@prisma/client";
import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../../domain/repositories/iuser";

export class UserRepositoryPrisma implements IUserRepository{
  
  private constructor(private readonly prisma: PrismaClient){}

  public static create(prisma: PrismaClient) {
      return new UserRepositoryPrisma(prisma);
  }
  
  public async save(user: User): Promise<void> {

    console.log('repositório')
    console.log(user.email)

    const data = {
      id: user.id,
      name: user.name,
      email: user.email,
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
        password: u.password
      });

      return user;
    });

    return userList;
  }

}