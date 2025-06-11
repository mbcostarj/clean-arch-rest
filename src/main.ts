import { ApiExpress } from "./infrastructure/api/express/api.express";
import { CreateUserRoute } from "./infrastructure/api/express/routes/user/create-user.route";
import { ListUserRoute } from "./infrastructure/api/express/routes/user/list-user.route";
import { UserRepositoryPrisma } from "./infrastructure/db/prisma/user.repository.prisma";
import { prisma } from "./package/prisma/prisma"
import { CreateUserUsecase } from "./use-cases/user/create-user.usecase";
import { ListUserUsecase } from "./use-cases/user/list-user.usecase";

function main(){

  const _Repository = UserRepositoryPrisma.create(prisma);

  const createUserUsecase = CreateUserUsecase.create(_Repository);
  const listUserUsecase = ListUserUsecase.create(_Repository);

  const createRoute = CreateUserRoute.create(createUserUsecase);
  const listRoute = ListUserRoute.create(listUserUsecase);

  const port = 8000;
  const api = ApiExpress.create([createRoute, listRoute]);
  api.start(port);

}

main();