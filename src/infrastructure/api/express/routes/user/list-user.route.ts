import { Request, Response } from "express";
import { ListUserOutputDto, ListUserUsecase } from "../../../../../use-cases/user/list-user.usecase"
import { HttpMethod, Route } from "../route"

export type ListUserResponseDto = {
  users: {
    id: string,
    name: string,
    email: string
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
      
      const responseBody = this.present(output);

      response.status(200).json(responseBody).send();
    }
  } 

  private present(input: ListUserOutputDto): ListUserResponseDto{
    const response: ListUserResponseDto = {
      users: input.users.map((u)=> ({
        id: u.id,
        name: u.name,
        email: u.email
      }))
    };

    return response;
  }

}