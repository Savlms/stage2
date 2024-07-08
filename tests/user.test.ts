import request from "supertest";
import app from "../src/app";

describe("User API", () => {
  it("should get a user by id", async () => {
    const loginRes = await request(app)
      .post("/login")
      .send({
        email: "john.doe@example.com",
        password: "password",
      });

    const token = loginRes.body.data.accessToken;

    const res = await request(app)
      .get("/api/users/1")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
  });

  it("should get all users", async () => {
    const loginRes = await request(app)
      .post("/login")
      .send({
        email: "john.doe@example.com",
        password: "password",
      });

    const token = loginRes.body.data.accessToken;

    const res = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("users");
  });

  it("should update a user", async () => {
    const loginRes = await request(app)
      .post("/login")
      .send({
        email: "john.doe@example.com",
        password: "password",
      });

    const token = loginRes.body.data.accessToken;

    const res = await request(app)
      .put("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        firstName: "John",
        lastName: "Doe Updated",
        phoneNumber: "0987654321",
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("firstName", "John");
    expect(res.body.data).toHaveProperty("lastName", "Doe Updated");
  });
});
