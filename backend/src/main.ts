import { createExpressApp } from "./infrastructure/api/express/api.express.factory";

async function main(){

  const app = await createExpressApp();
  const port = 8000;
  app.listen(port, '0.0.0.0', () => { console.log(`Server running on port ${port} 🚀🚀`); } );

}

main();