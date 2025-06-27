import { User } from "../../../domain/entities/user";
import { ErrorMessages, SuccessMessages } from "../../../shared/messages";
import { LoginOutputDto } from "../autenticate-user.usecase";

export class AutenticateUserPresenter {
  
  static userNotFound(): LoginOutputDto{
    return {
      status: false,
      code: 404,
      message: ErrorMessages.USER_NOT_FOUND
    };
  }

  static invalidPassword(): LoginOutputDto{
    return {
        status: false,
        code: 401,
        message: ErrorMessages.INVALID_PASSWORD,
      };
  }
  
  static toAoutput(user: User, token: string): LoginOutputDto{
    return {
      status: true,
      code: 201,
      message: SuccessMessages.LOGIN_SUCCESSFULLY,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    }
  }
}