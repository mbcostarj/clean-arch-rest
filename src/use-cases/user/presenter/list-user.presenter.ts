import { User } from "../../../domain/entities/user";
import { ListUserOutputDto, UserDto } from "../list-user.usecase";

export class ListUserPresenter {
  static toOutput(users: User[]): ListUserOutputDto{
    return {
      users: users.map((user): UserDto => ({
        id: user.id,
        name: user.name,
        email: user.email,
      })),
    };
  }
}