const { MongoClient } = require('mongodb');

const uri = "mongodb://root:example@localhost:27017"; // Подключение к MongoDB
let client

async function connectToDb() {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
    }
    return client;
}

async function insertData(dbName, collectionName, data) {
    try {
        client = await connectToDb();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const result = await collection.insertOne(data);
        console.log("Inserted document ID:", result.insertedId);
    } catch (error) {
        console.error("Error inserting data:", error);
    }
    // finally {
    //     await client.close();
    // }
}

async function checkSeriesIdx(dbName, collectionName, id) {
    try {
        client = await connectToDb();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const result = await collection.findOne({ series_idx: id });
        return result !== null;
    } catch (error) {
        console.error('Error checking series_idx:', error);
        return false;
    }
    // finally {
    //     await client.close();
    // }
}

async function checkSeriesId(dbName, collectionName, id) {
    try {
        client = await connectToDb();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const result = await collection.findOne({ id });
        return result !== null;
    } catch (error) {
        console.error('Error checking series_idx:', error);
        return false;
    }

}


// Вызывать `client.close()` только при завершении приложения
process.on('SIGINT', async () => {
    if (client) {
        await client.close();
        console.log('MongoDB connection closed');
    }
    process.exit(0);
});

// Пример вызова функции
// insertData("testDB", "users", { name: "John Doe", age: 30, email: "john@example.com" });

module.exports = { insertData, checkSeriesIdx, checkSeriesId };