const request = require("supertest");
const app = require("./app");
const { userModel } = require("./models/user");
const memoryDB = require("./test-utils/inmemorydb");
const { userRoleModel } = require("./models/userRole");
const { sweetModel } = require("./models/sweet");
const { signJwtToken } = require("./middlewares/auth");

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
beforeAll(async () => memoryDB.connectMemoryDB());

// beforeAll(
// });

// This function will clear in Memory database before running any test
// NOTE : for login api testing comment this function
beforeEach(async () => memoryDB.clearMemoryDB().then(createUserRoles));

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
      category: "testCategory",
      stock: 50,
    };

    // adding a user to the database to avoid authentication issues
    const user = new userModel({
      firstName: "testFirstName",
      lastName: "testLastName",
      email: "test@gmail.com",
      password: "testpassword",
      category: "testCategory",
      role: "admin", // Assuming 1 is a valid role for a admin
    });
    await user.save();

    // Act

    //getting the user role
    const role = user.role;
    const token = signJwtToken(user);

    const response = await request(app)
      .post("/api/sweet")
      .set("Authorization", `Bearer ${token}`)
      .send(newSweet);

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
    const user = new userModel({
      firstName: "testFirstName",
      lastName: "testLastName",
      email: "test@gmail.com",
      password: "testpassword",
      category: "testCategory",
      role: "admin", // Assuming 1 is a valid role for a admin
    });
    await user.save();

    // Act

    //getting the user role
    const role = user.role;
    const token = signJwtToken(user);

    // Act
    const response = await request(app)
      .post("/api/sweet")
      .set("Authorization", `Bearer ${token}`)
      .send(newSweet);

    // Assertion
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("All fields are required");
  });
});

describe("GET /api/sweets", () => {
  it("should respond with 200 and return all sweets", async () => {
    // Arrange
    const sweets = [
      {
        name: "testSweet1",
        price: 100,
        description: "testDescription1",
        image: "testImage1.jpg",
        category: "testCategory",
        stock: 50,
      },
      {
        name: "testSweet2",
        price: 200,
        description: "testDescription2",
        image: "testImage2.jpg",
        category: "testCategory",
        stock: 250,
      },
    ];

    // Adding sweets to the database
    await sweetModel.insertMany(sweets);

    // Act
    const response = await request(app).get("/api/sweets");

    // Assertion
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should respond with 201 if no sweets found", async () => {
    // Act
    const response = await request(app).get("/api/sweets");

    // Assertion
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("No sweets found");
  });
});

describe("GET /api/sweets/search", () => {
  it("should respond with 200 and return sweets matching the search term", async () => {
    // Arrange
    const sweets = [
      {
        name: "testSweet1",
        price: 100,
        description: "testDescription1",
        image: "testImage1.jpg",
        category: "chocolate",
        stock: 50,
      },
      {
        name: "testSweet2",
        price: 200,
        description: "testDescription2",
        image: "testImage2.jpg",
        category: "testCategory",
        stock: 250,
      },
    ];

    // Adding sweets to the database
    await sweetModel.insertMany(sweets);

    // Act
    const response = await request(app)
      .get("/api/sweets/search")
      .query({ term: 150 });

    // Assertion
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe("testSweet1");
  });

  it("should respond with 201 if no sweets match the search term", async () => {
    // Act
    const response = await request(app)
      .get("/api/sweets/search")
      .query({ term: "roti" });

    // Assertion
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("No sweets found");
  });
});

describe("PUT /api/sweets/:id", () => {
  it("should respond with 200 and update the sweet", async () => {
    // Arrange
    const sweet = new sweetModel({
      name: "testSweet",
      price: 100,
      description: "testDescription",
      image: "testImage.jpg",
      category: "testCategory",
      stock: 50,
    });
    await sweet.save();

    const updatedSweet = {
      name: "updatedSweet",
      price: 150,
      description: "updatedDescription",
      image: "updatedImage.jpg",
      category: "updatedCategory",
      stock: 100,
    };
    // adding a user to the database to avoid authentication issues
    const user = new userModel({
      firstName: "testFirstName",
      lastName: "testLastName",
      email: "test@gmail.com",
      password: "testpassword",
      category: "testCategory",
      role: "admin", // Assuming 1 is a valid role for a admin
    });
    await user.save();

    const token = signJwtToken(user);
    const role = user.role;

    // Act
    const response = await request(app)
      .put(`/api/sweets/${sweet._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedSweet);

    // Assertion
    expect(role).toBe("admin"); // Assuming is the role for admin
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedSweet.name);
    expect(response.body.price).toBe(updatedSweet.price);
  });

  it("should respond with 404 if sweet not found", async () => {
    // Arrange
    const user = new userModel({
      firstName: "testFirstName",
      lastName: "testLastName",
      email: "test@gmail.com",
      password: "testpassword",
      category: "testCategory",
      role: "admin", // Assuming 1 is a valid role for a admin
    });
    await user.save();

    // Act

    //getting the user role
    const role = user.role;
    const token = signJwtToken(user);

    // Act
    const response = await request(app)
      .put("/api/sweets/000000000000000000000000")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    // Assertion
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Please provide all fields!");
  });
});

describe("DELETE /api/sweets/:id", () => {
  it("should respond with 200 and delete the sweet", async () => {
    // Arrange
    const sweet = new sweetModel({
      name: "testSweet",
      price: 100,
      description: "testDescription",
      image: "testImage.jpg",
      category: "testCategory",
      stock: 50,
    });
    await sweet.save();

    const user = new userModel({
      firstName: "testFirstName",
      lastName: "testLastName",
      email: "test@gmail.com",
      password: "testpassword",
      category: "testCategory",
      role: "admin", // Assuming 1 is a valid role for a admin
    });
    await user.save();
    const token = signJwtToken(user);
    const role = user.role;

    // Act
    const response = await request(app)
      .delete(`/api/sweets/${sweet._id}`)
      .set("Authorization", `Bearer ${token}`);

    // Assertion
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Sweet deleted successfully");

    // Check if the sweet is actually deleted
    const deletedSweet = await sweetModel.findById(sweet._id);
    expect(role).toBe("admin"); // Assuming is the role for admin
    expect(deletedSweet).toBeNull();
  });

  it("should respond with 404 if sweet not found", async () => {
    // Arrange
    const user = new userModel({
      firstName: "testFirstName",
      lastName: "testLastName",
      email: "test@gmail.com",
      password: "testpassword",
      category: "testCategory",
      role: "admin", // Assuming 1 is a valid role for a admin
    });
    await user.save();

    // Act

    //getting the user role

    const token = signJwtToken(user);

    // Act

    const response = await request(app)
      .delete("/api/sweets/000000000000000000000000")
      .set("Authorization", `Bearer ${token}`);

    // Assertion
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Sweet not found");
  });
});

describe("POST /api/sweets/:id/purchase", () => {
  it("should respond with 200 and purchase the sweet", async () => {
    // Arrange
    const sweet = new sweetModel({
      name: "testSweet",
      price: 100,
      description: "testDescription",
      image: "testImage.jpg",
      category: "testCategory",
      stock: 50,
    });
    await sweet.save();

    const user = new userModel({
      firstName: "testFirstName",
      lastName: "testLastName",
      email: "test@gmail.com",
      password: "testpassword",
      category: "testCategory",
      role: "user", // Assuming 2 is a valid role for a user
    });

    await user.save();
    const role = user.role;
    const token = signJwtToken(user);

    // Act
    const response = await request(app)
      .post(`/api/sweets/${sweet._id}/purchase`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        quantity: 2,
        totalPrice: sweet.price * 2,
      });

    // Assertion
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      `Sweet with ID ${sweet._id} purchased successfully.`
    );
    expect(role).toBe("user"); // Assuming is the role for user
    expect(response.body.sweet.name).toBe(sweet.name);
    expect(response.body.sweet.stock).toBe(sweet.stock - 2);
  });

  it("should respond with 404 if sweet not purchase", async () => {
    // Arrange
    const user = new userModel({
      firstName: "testFirstName",
      lastName: "testLastName",
      email: "test@gmail.com",
      password: "testpassword",
      category: "testCategory",
      role: "admin", // Assuming 1 is a valid role for a admin
    });
    await user.save();

    // Act

    //getting the user role
    const role = user.role;
    const token = signJwtToken(user);

    // Act
    const response = await request(app)
      .post("/api/sweets/000000000000000000000000/purchase")
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 1 });

    // Assertion
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Sweet not found");
  });
});

describe("PUT /api/sweets/:id/restock", () => {
  it("should respond with 200 and restock the sweet", async () => {
    // Arrange
    const sweet = new sweetModel({
      name: "testSweet",
      price: 100,
      description: "testDescription",
      image: "testImage.jpg",
      category: "testCategory",
      stock: 50,
    });
    await sweet.save();

    const user = new userModel({
      firstName: "testFirstName",
      lastName: "testLastName",
      email: "test@gmail.com",
      password: "testpassword",
      role: "admin", // Assuming 1 is a valid role for a admin
    });
    await user.save();
    const role = user.role;
    const token = signJwtToken(user);
    // Act
    const response = await request(app)
      .put(`/api/sweets/${sweet._id}/restock`)
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 20 });

    // Assertion
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      `Sweet with ID ${sweet._id} restocked successfully.`
    );
    expect(role).toBe("admin"); // Assuming is the role for admin
    expect(response.body.sweet.name).toBe(sweet.name);
    expect(response.body.sweet.stock).toBe(sweet.stock + 20);
  });

  it("should respond with 404 if sweet not found for restock", async () => {
    // Arrange
    const user = new userModel({
      firstName: "testFirstName",
      lastName: "testLastName",
      email: "test@gmail.com",
      password: "testpassword",
      category: "testCategory",
      role: "admin", // Assuming 1 is a valid role for a admin
    });
    await user.save();

    // Act

    //getting the user role
    const role = user.role;
    const token = signJwtToken(user);

    // Act
    const response = await request(app)
      .put("/api/sweets/000000000000000000000000/restock")
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 10 });

    // Assertion
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Sweet not found");
  });
});
