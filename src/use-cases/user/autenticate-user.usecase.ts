import { createClient } from "redis";
import { IUserRepository } from "../../domain/repositories/iuser";
import { Usecase } from "../usecase";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { ITokenService } from "../../domain/services/itoken-service";
import { ITokenStore } from "../../domain/services/itoken-store";

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
    private tokenStore: ITokenStore
  ){}

  public static create(userRepository: IUserRepository, tokenService: ITokenService, tokenStore: ITokenStore){
    return new AutenticateUserUsecase(userRepository, tokenService, tokenStore);
  }

  public async execute(input: LoginInputDto): Promise<LoginOutputDto> {
    
    const user = await this.userRepository.findByEmail(input.email);
    if(!user) {
      return {
        status: false,
        message: 'User not found' 
      };
    }
    
    const isValid = await bcrypt.compare(input.password, user.password);
    
    if (!isValid) {
      return {
        status: false,
        message: 'Invalid password',
      };
    }
    
    const payload = { sub: user.id, name: user.name, email: user.email };
    const token = this.tokenService.sign(payload);

    await this.tokenStore.set(user.id, token);

    return {
      status: true,
      message: "Login successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };

  }
}