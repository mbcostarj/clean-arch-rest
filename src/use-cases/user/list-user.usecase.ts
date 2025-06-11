import { User } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/repositories/iuser";
import { Usecase } from "../usecase";

export type UserDto = {
    id: string,
    name: string,
    email: string,
};

export type ListUserInputDto  = void;

export type ListUserOutputDto = {
  users: UserDto[]
};

export class ListUserUsecase implements Usecase<ListUserInputDto, ListUserOutputDto>{

  private constructor(private readonly userRepository: IUserRepository){}
  
  public static create(userRepository: IUserRepository) {
      return new ListUserUsecase(userRepository);
  }

  public async execute(): Promise<ListUserOutputDto>{
    const _User = await this.userRepository.list();

    const output = this.listUserPresenter(_User);

    return output;
  };

  //posteriormente, desacoplar o presenter e tratae o retorno no controller
  private listUserPresenter(users: User[]): ListUserOutputDto { 
    return{
      users: users.map((u) => {
        return{
          id: u.id,
          name: u.name,
          email: u.email,
        }
      })
    }
  };

}