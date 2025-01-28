import request from "supertest";
import { describe, it, expect } from "vitest";

import petsRouter from "../src/api/pet-store/router";
import createApp from "../src/internals/create-app";

describe("Pet Store", () => {
  it("Responds with a pet", async () => {
    const app = createApp([{ prefix: "/pets", router: petsRouter }]);

    const response = await request(app).get("/pets/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      tag: expect.any(String),
    });
  });

  it("Responds with a pet created", async () => {
    const app = createApp([{ prefix: "/pets", router: petsRouter }]);

    const response = await request(app).post("/pets")
      .send({ name: "Felix", tag: "Cat" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: expect.any(Number), name: "Felix", tag: "Cat" });
  });

  it("Responds with not found when the pet does not exist", async () => {
    const app = createApp([{ prefix: "/pets", router: petsRouter }]);

    const response = await request(app).get("/pets/100");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404",
      title: "Not Found",
      detail: "Pet with 'id' 100 not found.",
      instance: "/pets/100",
    });
  });

  it("Responds with a validation error when the name is missing", async () => {
    const app = createApp([{ prefix: "/pets", router: petsRouter }]);

    const response = await request(app).post("/pets");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400",
      title: "Bad Request",
      detail: ["name is required"],
      instance: "/pets",
    });
  });

  it("Responds with a list of pets", async () => {
    const app = createApp([{ prefix: "/pets", router: petsRouter }]);

    const response = await request(app).get("/pets");

    expect(response.status).toBe(200);
    expect(expect.arrayContaining(expect.objectContaining(
      { id: expect.any(Number), name: expect.any(String), tag: expect.any(String) },
    )));
  });
});
