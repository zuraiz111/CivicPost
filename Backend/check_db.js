const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

async function run() {
  const client = new MongoClient(process.env.MONGO_URI.split('/CivicPost')[0] + '/');
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const dbs = await client.db().admin().listDatabases();
    console.log('Available Databases:', dbs.databases.map(d => d.name));

    const checkDbs = ['CivicPost', 'test'];
    for (const dbName of checkDbs) {
      const db = client.db(dbName);
      const collections = await db.listCollections().toArray();
      console.log(`\nChecking Database: ${dbName}`);
      console.log(`Collections:`, collections.map(c => c.name));
      
      if (collections.some(c => c.name === 'reports')) {
        const count = await db.collection('reports').countDocuments();
        console.log(`Reports Count in ${dbName}: ${count}`);
        
        if (count > 0) {
          const latest = await db.collection('reports').find().sort({createdAt: -1}).limit(5).toArray();
          console.log(`Latest 5 reports in ${dbName}:`, latest.map(r => r.trackingId));
        }
      } else {
        console.log(`No 'reports' collection found in ${dbName}`);
      }
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

run();
