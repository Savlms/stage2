import request from "supertest";
import app from "../src/app";

describe("Organisation API", () => {
  it("should create a new organisation", async () => {
    const loginRes = await request(app)
      .post("/login")
      .send({
        email: "john.doe@example.com",
        password: "password",
      });

    const token = loginRes.body.data.accessToken;

    const res = await request(app)
      .post("/api/organisations")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "New Organisation",
        description: "This is a new organisation",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("orgId");
  });

  it("should get an organisation by id", async () => {
    const loginRes = await request(app)
      .post("/login")
      .send({
        email: "john.doe@example.com",
        password: "password",
      });

    const token = loginRes.body.data.accessToken;

    const res = await request(app)
      .get("/api/organisations/1")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
  });

  it("should get all organisations", async () => {
    const loginRes = await request(app)
      .post("/login")
      .send({
        email: "john.doe@example.com",
        password: "password",
      });

    const token = loginRes.body.data.accessToken;

    const res = await request(app)
      .get("/api/organisations")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("organisations");
  });
});
