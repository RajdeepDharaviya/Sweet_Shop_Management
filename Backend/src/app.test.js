const request = require("supertest");
const app = require("./app");
const { userModel } = require("./models/user");
const memoryDB = require("./test-utils/inmemorydb");

// Increase Jest timeout to avoid timeout errors during DB setup
jest.setTimeout(20000);

// This function will first establish a connection to in memory db before runnig anything
beforeAll(async () => memoryDB.connectMemoryDB());

// This function will clear in Memory database before running any test
// NOTE : for login api testing comment this function
// beforeEach(async () => memoryDB.clearMemoryDB());

// This function will close connection after all thing is runed
afterAll(async () => memoryDB.closeMemoryDB());

describe("POST /api/auth/register ", () => {
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

    // Checkign record in database
    const user = await userModel.findOne({ email: newUser.email });

    expect(user).not.toBeNull();
    expect(user.firstName).toBe(newUser.firstName);
    expect(response.body._id).toBeDefined(); // Expect to get id
  });
});

describe("POST /api/auth/login", () => {
  it("Should respond with 200 and user object and login", async () => {
    // NOTE : for login api testing comment this function
    // beforeEach(async () => memoryDB.clearMemoryDB());
    // Arrange
    const userCredentials = {
      email: "test@gmail.com",
      password: "testpassword",
    };

    // Act
    const response = await request(app)
      .post("/api/auth/login")
      .send(userCredentials);

    //  ****** Assertion ******

    expect(response.body.user.email).toBe(userCredentials.email);
    expect(response.status).toBe(200);
    expect(response.body.user).not.toBeNull();
    expect(response.body.user._id).toBeDefined();
  });
});
