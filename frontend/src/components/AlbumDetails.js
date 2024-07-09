import React from "react";
import SongList from "./SongList";

function AlbumDetails({ artist, album, onDeleteSong, onUpdateSong }) {
  return (
    <div className="details">
      <h1 className={"box-title"}>{album.title}</h1>
      {album.description ? (
        <p className={"box-text"}>{album.description}</p>
      ) : album.songs && album.songs.length > 0 ? (
        <p className="box-text-no-data">
          No description available. <br></br>You can add a description by
          editing the album. ✏️💿
        </p>
      ) : (
        <p className="box-text-no-data">
          No data available.<br></br>Start by adding a song to the album or add
          a description by editing the album. ✏️💿
        </p>
      )}
      {album.songs && album.songs.length > 0 ? (
        <SongList
          songs={album.songs}
          album={album.title}
          artist={artist.name}
          onDeleteSong={onDeleteSong}
          onUpdateSong={onUpdateSong}
        />
      ) : album.description ? (
        <p className="box-text-no-data">
          No songs available.<br></br>Start by adding a song to the album . ✏️💿
        </p>
      ) : (
        ""
      )}
    </div>
  );
}

export default AlbumDetails;
