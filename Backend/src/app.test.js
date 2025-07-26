const request = require("supertest");

const app = require("./app");

describe(": POST /api/auth/register ", () => {
  it("should respond with 201 and create new user", async () => {
    // Arrange
    const newUser = {
      firstName: "testFirstName",
      lastName: "testLastName",
      email: "test@gmail.com",
      password: "testpassword",
      roleId: 0,
    };

    // Act
    const response = await request(app)
      .post("/api/auth/register")
      .send(newUser);

    // Assertion
    expect(response.body.firstName).toBe(newUser.firstName);
    expect(response.body.lastName).toBe(newUser.lastName);
    expect(response.body.email).toBe(newUser.email);
    expect(response.body.password).toBe(newUser.password);
    expect(response.body.roleId).toBe(newUser.roleId);
    expect(response.body._id).toBeDefined(); // Expect to get id
  });
});
