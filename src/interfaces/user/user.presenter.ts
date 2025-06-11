import { User } from "../../domain/entities/user";
import { ListUserOutputDto } from "../../use-cases/user/list-user.usecase";

export function listUserPresenter(users: User[]): ListUserOutputDto {
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

