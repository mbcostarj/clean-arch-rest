import { Request, Response } from "express";
import { 
  CreateUserInputDto, 
  CreateUserOutputDto, 
  CreateUserUsecase } from "../../../../../use-cases/user/create-user.usecase"
import { HttpMethod, Route } from "../route"

export type CreateUserResponseDto = {
  id: string
}

export class CreateUserRoute implements Route {

  private constructor (
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createUserService: CreateUserUsecase
  ){}

  public static create(service: CreateUserUsecase){
    return new CreateUserRoute(
      "/user",
      HttpMethod.POST,
      service
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const {name, email, password} = request.body;

      const input: CreateUserInputDto = {
        name,
        email,
        password
      }

      const output: CreateUserOutputDto = await this.createUserService.execute(input);

      response.status(output.code).json(output).send();

    }
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }

}