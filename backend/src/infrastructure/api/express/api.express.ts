import { Api } from "../api";
import express, { Express } from 'express';
import { Route } from "./routes/route";
import cors from "cors";

export class ApiExpress implements Api {
  
  private app: Express;

  private constructor (routes: Route[]){
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.addRoutes(routes);
  }

  public static create(routes: Route[]){
    return new ApiExpress(routes);
  }

  public getApp(): Express {
    return this.app;
  }

  private addRoutes(routes: Route[]){
    routes.forEach((route => {
      const path = route.getPath();
      const method = route.getMethod();
      const handler = route.getHandler();

      this.app[method](path, handler);
    }));
  }

  start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port} 🚀🚀`);
      this.listRoutes();
    })
  }

  private listRoutes(){
    const routes = this.app.router.stack
      .filter((route: any) => route.route)
      .map((route: any) => {
        return {
          path: route.route.path,
          method: route.route.stack[0].method
        }
      });

    console.log(routes);
  }

}