import { createClient, RedisClientType } from "redis";
import { ApiExpress } from "./infrastructure/api/express/api.express";
import { CreateUserRoute } from "./infrastructure/api/express/routes/user/create-user.route";
import { ListUserRoute } from "./infrastructure/api/express/routes/user/list-user.route";
import { UserRepositoryPrisma } from "./infrastructure/db/prisma/user.repository.prisma";
import { prisma } from "./package/prisma/prisma"
import { AutenticateUserUsecase } from "./use-cases/user/autenticate-user.usecase";
import { CreateUserUsecase } from "./use-cases/user/create-user.usecase";
import { ListUserUsecase } from "./use-cases/user/list-user.usecase";
import { JwtService } from "./infrastructure/auth/jwt/jwt.service";
import { RedisTokenStore } from "./infrastructure/auth/redis/redis.token.store";
import { AutenticateUserRoute } from "./infrastructure/api/express/routes/user/autenticate-user.route";

async function main(){

  const redisClient: RedisClientType = createClient({url: process.env.REDIS_URL });
  await redisClient.connect();

  const jwtService = new JwtService(process.env.JWT_SECRET!);
  const tokenStore = new RedisTokenStore(redisClient);

  const _Repository = UserRepositoryPrisma.create(prisma);
  
  const createUserUsecase = CreateUserUsecase.create(_Repository);
  const listUserUsecase = ListUserUsecase.create(_Repository);
  const autenticateUserUsecase = AutenticateUserUsecase.create(_Repository, jwtService, tokenStore);

  const createUserRoute = CreateUserRoute.create(createUserUsecase);
  const listUserRoute = ListUserRoute.create(listUserUsecase);
  const autenticateUser = AutenticateUserRoute.create(autenticateUserUsecase);

  const port = 8000;
  const api = ApiExpress.create([createUserRoute, listUserRoute, autenticateUser]);
  api.start(port);

}

main();