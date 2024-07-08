import React from "react";
import Song from "./Song";

function SongList({ artist, album, songs, onDeleteSong, onUpdateSong }) {
  return songs && songs.length > 0 ? (
    <li className="list list-library">
      {songs.map((song) => (
        <Song
          song={song}
          album={album}
          artist={artist}
          key={song.title}
          onDeleteSong={onDeleteSong}
          onUpdateSong={onUpdateSong}
        />
      ))}
    </li>
  ) : (
    <div className="center-text-container">No data available. 🥺</div>
  );
}

export default SongList;
