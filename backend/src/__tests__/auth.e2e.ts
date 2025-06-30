import request from "supertest";
import { createExpressApp } from "../infrastructure/api/express/api.express.factory";
import { prisma } from "../package/prisma/prisma";
import { ErrorMessages, SuccessMessages } from "../shared/messages";

describe("Auth E2E", ()=>{
  let app: any;

  beforeAll(async ()=>{
    app = await createExpressApp();
  });

  beforeEach(async ()=>{
    await prisma.user.deleteMany();
  });

  it("shold register and then login a user successfully", async ()=> {
    const userData = {
      name: "John Doe",
      email: "john.doe@test.com",
      password: "123456"
    }

    //Create user
    const resCreate = await request(app)
      .post("/user")
      .send(userData)
      .expect(201);

    expect(resCreate.body).toHaveProperty("id");

    // Login
    const resLogin = await request(app)
      .post("/login")
      .send({
        email: userData.email,
        password: userData.password
      })
      .expect(201);

    expect(resLogin.body).toMatchObject({
      status: true,
      message: SuccessMessages.LOGIN_SUCCESSFULLY,
      token: expect.any(String),
      user: {
        id: expect.any(String),
        name: userData.name,
        email: userData.email
      }
    });

  });

  it("should return error on invalid password", async () => {
    const userData = {
      name: "John Doe",
      email: "john.doe@test.com",
      password: "123456"
    };

    await request(app).post("/user").send(userData);

    const res = await request(app)
      .post("/login")
      .send({
        email: userData.email,
        password: "wrong-password"
      })
      .expect(401);

    expect(res.body).toMatchObject({
      status: false,
      message: ErrorMessages.INVALID_PASSWORD
    });
  });

  it("should return error if user does not exist", async () => {
    const res = await request(app)
      .post("/login")
      .send({
        email: "notfound@test.com",
        password: "123456"
      })
      .expect(404);

    expect(res.body).toMatchObject({
      status: false,
      message: ErrorMessages.USER_NOT_FOUND
    });
  });

});