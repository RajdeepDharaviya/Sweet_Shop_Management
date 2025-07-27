const { sweetModel } = require("../models/sweet");
const { addSweetController } = require("./sweet");

// Mock the sweetModel.create method
jest.mock("../models/sweet", () => ({
  sweetModel: {
    create: jest.fn(),
  },
}));

describe("Sweet Model Tests", () => {
  it("sweet method calls only one time and with correct parameter", async () => {
    const sweetData = {
      name: "rasgulla",
      price: 150,
      description: "Delicious bangali sweet",
      image: "rasgulla.jpg",
      category: "Bengali Sweets",
      stock: 500,
    };

    // create a mock request object
    const req = {
      body: {
        ...sweetData,
      },
    };

    // create a mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    addSweetController(req, res);
    expect(sweetModel.create).toHaveBeenCalledTimes(1);
    expect(sweetModel.create).toHaveBeenCalledWith(sweetData);
  });
});
