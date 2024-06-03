
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const dbName = 'jobListingsDB';
const collectionName = 'jobListings';
let client;

const connectToMongoDB = async () => {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  const db = client.db(dbName);
  return db.collection(collectionName);
};

const closeMongoDBConnection = async () => {
  if (client) {
    await client.close();
    client = null;
  }
};

module.exports = {
  connectToMongoDB,
  closeMongoDBConnection,
};
