import bcrypt from "bcryptjs";
import { User } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/repositories/iuser";
import { Usecase } from "../usecase";

export type CreateUserInputDto = {
  name: string,
  email: string,
  password: string
}

export type CreateUserOutputDto = {
  id: string
}

export class CreateUserUsecase implements Usecase<CreateUserInputDto, CreateUserOutputDto> {
  
  private constructor(private readonly userRepository: IUserRepository){}

  public static create(userRepository: IUserRepository){
    return new CreateUserUsecase(userRepository);
  }

  public async execute({name, email, password}: CreateUserInputDto): Promise<CreateUserOutputDto> {
    
    const userExist = await this.userRepository.findByEmail(email);
    if(userExist) throw new Error('User already exists');

    const hashedPasss = await bcrypt.hash(password, 10);

    const _User = User.create(name, email, hashedPasss);
    
    await this.userRepository.save(_User);
    
    const output: CreateUserOutputDto = {
      id: _User.id
    }
    return output;
  }

}