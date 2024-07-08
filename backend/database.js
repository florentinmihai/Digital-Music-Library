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

async function deleteArtist(artistName) {
  try {
    await client
      .db("MusicLibrary")
      .collection("MusicLibrary")
      .deleteOne({ name: artistName });
  } catch (err) {
    console.error("Error deleting artist:", err);
  }
}

async function deleteAlbum(artistName, albumTitle) {
  try {
    await client
      .db("MusicLibrary")
      .collection("MusicLibrary")
      .updateOne(
        { name: artistName },
        { $pull: { albums: { title: albumTitle } } }
      );
  } catch (err) {
    console.error("Error deleting album:", err);
  }
}

async function updateArtist(oldName, newName) {
  try {
    await client
      .db("MusicLibrary")
      .collection("MusicLibrary")
      .updateOne({ name: oldName }, { $set: { name: newName } });
  } catch (err) {
    console.error("Error updating artist:", err);
  }
}

async function updateAlbum(artistName, oldTitle, newTitle, newDescription) {
  try {
    await client
      .db("MusicLibrary")
      .collection("MusicLibrary")
      .updateOne(
        { name: artistName, "albums.title": oldTitle },
        {
          $set: {
            "albums.$.title": newTitle,
            "albums.$.description": newDescription,
          },
        }
      );
  } catch (err) {
    console.error("Error updating album:", err);
  }
}

async function deleteSong(artistName, albumTitle, songTitle) {
  try {
    await client
      .db("MusicLibrary")
      .collection("MusicLibrary")
      .updateOne(
        { name: artistName, "albums.title": albumTitle },
        { $pull: { "albums.$.songs": { title: songTitle } } }
      );
  } catch (err) {
    console.error("Error deleting song:", err);
  }
}

module.exports = {
  retrieveMusicLibrary,
  deleteArtist,
  deleteAlbum,
  deleteSong, // Export the new deleteSong function
  updateArtist,
  updateAlbum,
};
