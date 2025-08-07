import { Request, Response } from "express";
import { ListUserOutputDto, ListUserUsecase } from "../../../../../use-cases/user/list-user.usecase"
import { HttpMethod, Route } from "../route"

export type ListUserResponseDto = {
  users: {
    id: string,
    name: string,
    email: string,
    phone: string,
  }[];
};

export class ListUserRoute implements Route {

  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listUserService: ListUserUsecase
  ){}

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod{
    return this.method;
  }

  public static create(listUserService: ListUserUsecase){
    return new ListUserRoute(
      "/user",
      HttpMethod.GET,
      listUserService
    );
  }

  public getHandler(){
    return async (request: Request, response: Response) => {
      const output = await this.listUserService.execute();
      response.status(200).json(output).send();
    }
  } 

}