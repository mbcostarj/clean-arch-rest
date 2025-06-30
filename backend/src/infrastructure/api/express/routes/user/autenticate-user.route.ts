import { Request, response, Response } from "express"
import { HttpMethod, Route } from "../route"
import { AutenticateUserUsecase, LoginInputDto, LoginOutputDto } from "../../../../../use-cases/user/autenticate-user.usecase"
import { ErrorMessages } from "../../../../../shared/messages"

export type AutenticateUserResponseDto = {
  status: boolean,
  code: number,
  message: string,
  token: string,
  user: {
    id: string,
    name: string,
    email: string,
  }
}

export class AutenticateUserRoute implements Route {
  private constructor(
      private readonly path: string,
      private readonly method: HttpMethod,
      private readonly autenticateUserService: AutenticateUserUsecase
    ){}

  public static create(service: AutenticateUserUsecase){
    return new AutenticateUserRoute(
      "/login",
      HttpMethod.POST,
      service
    );
  }
  
  public getHandler(){
    return async (request: Request, response: Response) => {
      const {email, password} = request.body;

      const input: LoginInputDto = { email, password }; 
      const output: LoginOutputDto = await this.autenticateUserService.execute(input);

      response.status(output.code).json(output).send();      
    }
  }

  getPath(): string {
    return this.path;
  }
  
  getMethod(): HttpMethod {
    return this.method;
  }
  
}