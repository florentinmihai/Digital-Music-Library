const http = require("http");
const database = require("./database");

http
  .createServer(async (req, res) => {
    // Handle CORS errors
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, DELETE");
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
    }
  })
  .listen(4000);
