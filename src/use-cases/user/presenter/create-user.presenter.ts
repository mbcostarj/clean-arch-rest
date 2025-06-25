import { ErrorMessages, SuccessMessages } from "../../../shared/messages";
import { CreateUserOutputDto } from "../create-user.usecase";

export class CreateUserPresenter {
  static userExist(): CreateUserOutputDto {
    return {
      status: false,
      message: ErrorMessages.USER_ALREADY_EXISTS
    }
  };

  static toOutput(id: string): CreateUserOutputDto {
    return {
      status: true,
      message: SuccessMessages.CREATE_USER_SUCCESSFULLY,
      id
    }
  }
}