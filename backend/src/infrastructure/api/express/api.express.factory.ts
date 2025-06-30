import express, { Express } from 'express';
import { createUsecases } from '../../factory/usecases.factory';
import { CreateUserRoute } from './routes/user/create-user.route';
import { ListUserRoute } from './routes/user/list-user.route';
import { AutenticateUserRoute } from './routes/user/autenticate-user.route';
import { ApiExpress } from './api.express';

export async function createExpressApp(): Promise<Express> {

  const { createUserUsecase, listUserUsecase, autenticateUserUsecase } = await createUsecases();

  const routes = [
    CreateUserRoute.create(createUserUsecase),
    ListUserRoute.create(listUserUsecase),
    AutenticateUserRoute.create(autenticateUserUsecase)
  ];

  const api = ApiExpress.create(routes);
  return api.getApp();
}