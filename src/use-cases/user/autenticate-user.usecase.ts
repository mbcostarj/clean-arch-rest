import { IUserRepository } from "../../domain/repositories/iuser";
import { Usecase } from "../usecase";
import { ITokenService } from "../../domain/services/itoken-service";
import { ITokenStore } from "../../domain/services/itoken-store";
import { IEncrypter } from "../../domain/services/iencrypter";
import { AutenticateUserPresenter } from "./presenter/autenticate-user.presenter";

export interface LoginInputDto {
  email: string;
  password: string;
}

export interface LoginOutputDto {
  status: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  }
}

export class AutenticateUserUsecase implements Usecase<LoginInputDto, LoginOutputDto> {

  private constructor(
    private readonly userRepository: IUserRepository,
    private tokenService: ITokenService,
    private tokenStore: ITokenStore,
    private readonly encrypter: IEncrypter
  ){}

  public static create(
    userRepository: IUserRepository, 
    tokenService: ITokenService, 
    tokenStore: ITokenStore, 
    encrypter: IEncrypter
  ){
    return new AutenticateUserUsecase(userRepository, tokenService, tokenStore, encrypter);
  }

  public async execute(input: LoginInputDto): Promise<LoginOutputDto> {
    
    const user = await this.userRepository.findByEmail(input.email);
    if(!user) {
      return AutenticateUserPresenter.userNotFound();
    }
    
    const isValid = await this.encrypter.compare(input.password, user.password);
    
    if (!isValid) {
      return AutenticateUserPresenter.invalidPassword();
    }
    
    const payload = { sub: user.id, name: user.name, email: user.email };
    const token = this.tokenService.sign(payload);
    await this.tokenStore.set(user.id, token);

    return  AutenticateUserPresenter.toAoutput(user, token);

  }
}