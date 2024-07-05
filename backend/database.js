const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://admin:4yGwB7vNXagssIDL@musiclibrary.aojeux4.mongodb.net/?appName=MusicLibrary";

const client = new MongoClient(uri);
client.connect();

async function retrieveMusicLibrary() {
  try {
    const dataset = await client
      .db("MusicLibrary")
      .collection("MusicLibrary")
      .find()
      .toArray();
    return JSON.stringify(dataset);
  } catch {
    console.log("db closed");
    await client.close();
  }
}
module.exports = { retrieveMusicLibrary };
