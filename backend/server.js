const http = require("http");
const database = require("./database");

http
  .createServer(async (req, res) => {
    // Handle CORS errors
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, DELETE, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Max-Age", 2592000); // 30 days

    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }

    if (req.url === "/api/retrieveMusicLibrary") {
      try {
        res.writeHead(200, { "Content-Type": "application/json" });
        const dataset = await database.retrieveMusicLibrary();
        res.write(dataset);
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.write(
          JSON.stringify({ error: "Failed to retrieve music library" })
        );
      } finally {
        res.end();
      }
    } else if (
      req.method === "DELETE" &&
      req.url.startsWith("/api/deleteArtist/")
    ) {
      const artistName = decodeURI(req.url.split("/api/deleteArtist/")[1]);
      try {
        await database.deleteArtist(artistName);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "Artist deleted successfully" }));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ error: "Failed to delete artist" }));
      } finally {
        res.end();
      }
    } else if (
      req.method === "DELETE" &&
      req.url.startsWith("/api/deleteAlbum/")
    ) {
      const [artistName, albumTitle] = decodeURI(
        req.url.split("/api/deleteAlbum/")[1]
      ).split("/");
      try {
        await database.deleteAlbum(artistName, albumTitle);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "Album deleted successfully" }));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ error: "Failed to delete album" }));
      } finally {
        res.end();
      }
    } else if (
      req.method === "DELETE" &&
      req.url.startsWith("/api/deleteSong/")
    ) {
      const [artistName, albumTitle, songTitle] = decodeURI(
        req.url.split("/api/deleteSong/")[1]
      ).split("/");
      try {
        await database.deleteSong(artistName, albumTitle, songTitle);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "Song deleted successfully" }));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ error: "Failed to delete song" }));
      } finally {
        res.end();
      }
    } else if (
      req.method === "PUT" &&
      req.url.startsWith("/api/updateArtist/")
    ) {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", async () => {
        const { oldName, newName } = JSON.parse(body);
        try {
          await database.updateArtist(oldName, newName);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.write(JSON.stringify({ message: "Artist updated successfully" }));
        } catch (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.write(JSON.stringify({ error: "Failed to update artist" }));
        } finally {
          res.end();
        }
      });
    } else if (
      req.method === "PUT" &&
      req.url.startsWith("/api/updateAlbum/")
    ) {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", async () => {
        const { artistName, oldTitle, newTitle, newDescription } =
          JSON.parse(body);
        try {
          await database.updateAlbum(
            artistName,
            oldTitle,
            newTitle,
            newDescription
          );
          res.writeHead(200, { "Content-Type": "application/json" });
          res.write(JSON.stringify({ message: "Album updated successfully" }));
        } catch (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.write(JSON.stringify({ error: "Failed to update album" }));
        } finally {
          res.end();
        }
      });
    }
  })
  .listen(4000);
