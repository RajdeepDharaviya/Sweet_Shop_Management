const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let inMemoryMongoDB;

// Connect to the in memory database
const connectMemoryDB = async () => {
  inMemoryMongoDB = await MongoMemoryServer.create();

  const uri = inMemoryMongoDB.getUri();

  await mongoose.connect(uri);
};

// Disconnect and close the connection
const closeMemoryDB = async () => {
  await mongoose.connection.dropDatabase();

  await mongoose.connection.close();

  await inMemoryMongoDB.stop();
};

// clear all data from the database
const clearMemoryDB = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];

    await collection.deleteMany({});
  }
};

module.exports = { connectMemoryDB, clearMemoryDB, closeMemoryDB };
