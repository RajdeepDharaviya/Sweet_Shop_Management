const request = require("supertest");
const { registerUserController, loginUserController } = require("./auth");
const { userModel } = require("../models/user");
const { json } = require("express");

// creating mock of user model
jest.mock("../models/user.js");

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
