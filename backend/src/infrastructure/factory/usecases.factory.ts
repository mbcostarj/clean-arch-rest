import { createClient, RedisClientType } from "redis";
import { JwtService } from "../auth/jwt/jwt.service";
import { RedisTokenStore } from "../auth/redis/redis.token.store";
import { BcryptEncrypter } from "../services/bcrypt-encrypter";
import { prisma } from "../../package/prisma/prisma";
import { AutenticateUserUsecase } from "../../use-cases/user/autenticate-user.usecase";
import { CreateUserUsecase } from "../../use-cases/user/create-user.usecase";
import { ListUserUsecase } from "../../use-cases/user/list-user.usecase";
import { UserRepositoryPrisma } from "../db/prisma/user.repository.prisma";

export async function createUsecases(){
  //infra
  const redisClient: RedisClientType = createClient({url: process.env.REDIS_URL });
  await redisClient.connect();

  const _Repository = UserRepositoryPrisma.create(prisma);
  const jwtService = new JwtService(process.env.JWT_SECRET!);
  const tokenStore = new RedisTokenStore(redisClient);
  const encrypter = new BcryptEncrypter();

  const createUserUsecase = CreateUserUsecase.create(_Repository, encrypter);
  const listUserUsecase = ListUserUsecase.create(_Repository);
  const autenticateUserUsecase = AutenticateUserUsecase.create(
    _Repository, jwtService, tokenStore, encrypter
  );

  return { createUserUsecase, listUserUsecase, autenticateUserUsecase };
}