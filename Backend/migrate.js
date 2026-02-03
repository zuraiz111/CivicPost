const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

async function migrate() {
  const client = new MongoClient(process.env.MONGO_URI.split('/CivicPost')[0] + '/');
  try {
    await client.connect();
    const sourceDb = client.db('test');
    const targetDb = client.db('CivicPost');

    const collections = ['reports', 'citizens', 'staffs', 'messages'];

    for (const collName of collections) {
      const data = await sourceDb.collection(collName).find().toArray();
      if (data.length > 0) {
        console.log(`Migrating ${data.length} documents from test.${collName} to CivicPost.${collName}...`);
        await targetDb.collection(collName).deleteMany({}); // Clear target first
        await targetDb.collection(collName).insertMany(data);
      }
    }
    console.log('Migration completed successfully!');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await client.close();
  }
}

migrate();
