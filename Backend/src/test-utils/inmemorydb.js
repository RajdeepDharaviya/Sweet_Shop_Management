const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let inMemoryMongoDB;

// Connect to the in memory database
const connectMemoryDB = async () => {
  try {
    inMemoryMongoDB = await MongoMemoryServer.create();

    const uri = inMemoryMongoDB.getUri();

    await mongoose.connect(uri);
  } catch (err) {
    console.log("Error : ", err.message);
  }
};

// Disconnect and close the connection
const closeMemoryDB = async () => {
  try {
    await mongoose.connection.dropDatabase();

    await mongoose.connection.close();

    await inMemoryMongoDB.stop();
  } catch (err) {
    console.log("Error : ", err.message);
  }
};

// clear all data from the database
const clearMemoryDB = async () => {
  try {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];

      await collection.deleteMany({});
    }
  } catch (err) {
    console.log("Error : ", err.message);
  }
};

module.exports = { connectMemoryDB, clearMemoryDB, closeMemoryDB };
