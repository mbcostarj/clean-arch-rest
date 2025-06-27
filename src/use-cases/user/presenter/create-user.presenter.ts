import { ErrorMessages, SuccessMessages } from "../../../shared/messages";
import { CreateUserOutputDto } from "../create-user.usecase";

export class CreateUserPresenter {
  static userExist(): CreateUserOutputDto {
    return {
      status: false,
      code: 401,
      message: ErrorMessages.USER_ALREADY_EXISTS
    }
  };

  static toOutput(id: string): CreateUserOutputDto {
    return {
      status: true,
      code: 201,
      message: SuccessMessages.CREATE_USER_SUCCESSFULLY,
      id
    }
  }
}