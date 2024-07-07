import React from "react";
import Song from "./Song";

function SongList({ songs }) {
  return songs && songs.length > 0 ? (
    <ul className="list list-library">
      {songs.map((song) => (
        <Song song={song} key={song.title} />
      ))}
    </ul>
  ) : (
    <div className="center-text-container">No data available. 🥺</div>
  );
}

export default SongList;
