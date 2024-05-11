import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../src/server";

describe("GET /_healthz", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get("/_healthz");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ message: "OK" });
  });
});

describe("GET /non-existent-endpoint", () => {
  it("should return 404 Not Found", async () => {
    const res = await request(app).get("/non-existent-endpoint");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({ message: "Not Found" });
  });
});
