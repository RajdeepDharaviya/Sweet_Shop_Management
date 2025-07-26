const request = require("supertest");
const { registerUserController, loginUserController } = require("./auth");
const { userModel } = require("../models/user");
const { json } = require("express");

// creating mock of user model
jest.mock("../models/user.js");

describe("Register User Controller ", () => {
  it("should call a user model create method with the correct arguement", () => {
    const req = {
      body: {
        firstName: "raj",
        lastName: "dharaviya",
        email: "raj@gmail.com",
        password: "13245678",
        roleId: 0,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    // Act
    // calling the function
    registerUserController(req, res);

    // Assertion

    expect(userModel.create).toHaveBeenCalledWith(req.body);
    expect(userModel.create).toHaveBeenCalledTimes(1);
  });
});

describe("Login User Controller ", () => {
  it("should call a user model methods two times", () => {
    const userCredentials = {
      email: "test@gmail.com",
      password: "testpassword",
    };

    const req = {
      body: {
        ...userCredentials,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    loginUserController(req, res);

    expect(userModel.findOne).toHaveBeenCalledTimes(1);
  });
});
