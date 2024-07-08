import request from "supertest";
import app from "../src/app";

describe("Auth API", () => {
  it("should sign up a new user", async () => {
    const res = await request(app)
      .post("/signup")
      .send({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "password",
        phoneNumber: "1234567890",
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("accessToken");
  });

  it("should log in a user", async () => {
    const res = await request(app)
      .post("/login")
      .send({
        email: "john.doe@example.com",
        password: "password",
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("accessToken");
  });

  it("should log out a user", async () => {
    const res = await request(app)
      .post("/logout");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Logged Out");
  });
});
