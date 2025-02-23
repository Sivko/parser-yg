const { MongoClient } = require('mongodb');

const uri = "mongodb://root:example@localhost:27017"; // Подключение к MongoDB
const client = new MongoClient(uri);

async function insertData(dbName, collectionName, data) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const result = await collection.insertOne(data);
        console.log("Inserted document ID:", result.insertedId);
    } catch (error) {
        console.error("Error inserting data:", error);
    } finally {
        await client.close();
    }
}

// Пример вызова функции
// insertData("testDB", "users", { name: "John Doe", age: 30, email: "john@example.com" });

module.exports = { insertData };