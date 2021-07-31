import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Create category controller", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO users (id, name, email, password, "isAdmin", created_at, driver_license)
    VALUES('${uuid()}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXX-XXX')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category supertest forever",
        description: "Category supertest",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(201);
  });

  it("should not be create duplicate category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Teste2",
        description: "Category supertest",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Teste2",
        description: "Category supertest",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.statusCode).toBe(400);
  });
});
