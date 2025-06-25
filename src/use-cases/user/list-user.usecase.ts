import { User } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/repositories/iuser";
import { Usecase } from "../usecase";
import { ListUserPresenter } from "./presenter/list-user.presenter";

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
    return ListUserPresenter.toOutput(_User);
  };

}