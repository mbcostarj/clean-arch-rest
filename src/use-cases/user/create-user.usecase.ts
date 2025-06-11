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
    const _User = User.create(name, email, password);
    
    await this.userRepository.save(_User);
    
    const output: CreateUserOutputDto = {
      id: _User.id
    }
    return output;
  }

}