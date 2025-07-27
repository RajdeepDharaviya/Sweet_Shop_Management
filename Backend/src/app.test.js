const request = require("supertest");
const app = require("./app");
const { userModel } = require("./models/user");
const memoryDB = require("./test-utils/inmemorydb");
const { userRoleModel } = require("./models/userRole");

// Increase Jest timeout to avoid timeout errors during DB setup
jest.setTimeout(20000);

// This function will create userRole model in memory db before running any test
const createUserRoles = async () => {
  // creating a user role models for testing
  const roles = [{ role: "admin" }, { role: "user" }, { role: "employee" }];
  roles.forEach(async (role) => {
    await userRoleModel.create(role);
  });
};

// This function will first establish a connection to in memory db before runnig anything
beforeAll(async () =>
  memoryDB
    .connectMemoryDB()
    .then(() => createUserRoles())
    .catch((err) => {
      console.error("Error connecting to in-memory database:", err.message);
    })
);

// beforeAll(
// });

// This function will clear in Memory database before running any test
// NOTE : for login api testing comment this function
beforeEach(async () => memoryDB.clearMemoryDB());

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
      role: "0",
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

  it("should respond with 400 for missing fields", async () => {
    // Arrange
    const newUser = {
      firstName: "testFirstName",
      lastName: "testLastName",
      email: "test@gmail.com",
    };

    // Act
    const response = await request(app)
      .post("/api/auth/register")
      .send(newUser);

    // Assertion
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("All fields are required");
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
    // adding a user to the database to avoid authentication issues
    const user = new userModel({
      firstName: "testFirstName",
      lastName: "testLastName",
      email: "test@gmail.com",
      password: "testpassword",
      role: "admin", // Assuming 1 is a valid role for a admin
    });
    await user.save();
    const response = await request(app)
      .post("/api/auth/login")
      .send(userCredentials);

    //  ****** Assertion ******

    expect(response.body.user.email).toBe(userCredentials.email);
    expect(response.status).toBe(200);
    expect(response.body.user).not.toBeNull();
    expect(response.body.user._id).toBeDefined();
  });

  it("Should respond with 401 for invalid credentials", async () => {
    // Arrange
    const userCredentials = {
      email: "test2@gmail.com",
      password: "wrongpassword",
    };

    // Act
    const response = await request(app)
      .post("/api/auth/login")
      .send(userCredentials);

    // Assertion
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid email or password");
  });

  it("Should respond with 401 for non-existing user", async () => {
    // Arrange
    const userCredentials = {
      email: "test2@gmail.com",
      password: "testpassword",
    };

    // Act
    const response = await request(app)
      .post("/api/auth/login")
      .send(userCredentials);

    // Assertion
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid email or password");
  });
});

// spy a user role model
const userRoleSpy = jest.spyOn(userRoleModel, "findOne");

describe("POST /api/sweet", () => {
  it("should respond with 201 and create new sweet", async () => {
    // Arrange
    const newSweet = {
      name: "testSweet",
      price: 100,
      description: "testDescription",
      image: "testImage.jpg",
      stock: 50,
    };

    // adding a user to the database to avoid authentication issues
    const user = new userModel({
      firstName: "testFirstName",
      lastName: "testLastName",
      email: "test@gmail.com",
      password: "testpassword",
      role: "admin", // Assuming 1 is a valid role for a admin
    });
    await user.save();

    // Act

    //getting the user role
    const role = user.role;

    const response = await request(app).post("/api/sweet").send(newSweet);

    // Assertion

    // userRoleSpy.mockReturnValueOnce(); // Mocking the user role to be admin

    expect(role).toBe("admin"); // Assuming is the role for admin
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newSweet.name);
    expect(response.body.price).toBe(newSweet.price);
    ``;
    expect(response.body._id).toBeDefined();
  });

  it("should respond with 400 for missing fields", async () => {
    // Arrange
    const newSweet = {
      name: "testSweet",
      price: 100,
    };

    // Act
    const response = await request(app).post("/api/sweet").send(newSweet);

    // Assertion
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("All fields are required");
  });
});
