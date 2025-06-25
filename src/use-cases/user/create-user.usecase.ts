import { User } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/repositories/iuser";
import { Usecase } from "../usecase";
import { IEncrypter } from "../../domain/services/iencrypter";
import { CreateUserPresenter } from "./presenter/create-user.presenter";
import { create } from "node:domain";

export type CreateUserInputDto = {
  name: string,
  email: string,
  password: string
}

export type CreateUserOutputDto = {
  status: boolean;
  message: string;
  id?: string;
}

export class CreateUserUsecase implements Usecase<CreateUserInputDto, CreateUserOutputDto> {
  
  private constructor(
    private readonly userRepository: IUserRepository,
    private readonly encrypter: IEncrypter
  ){}

  public static create(userRepository: IUserRepository, encrypter: IEncrypter){
    return new CreateUserUsecase(userRepository, encrypter);
  }

  public async execute({name, email, password}: CreateUserInputDto): Promise<CreateUserOutputDto> {
    
    const userExist = await this.userRepository.findByEmail(email);
    
   // console.log("userExist", userExist)

    if(userExist) return CreateUserPresenter.userExist();

    const hashedPasss = await this.encrypter.hash(password);

    const _User = User.create(name, email, hashedPasss);
    
    await this.userRepository.save(_User);
    
    return CreateUserPresenter.toOutput(_User.id);
  }

}