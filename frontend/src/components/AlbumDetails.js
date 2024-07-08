import React from "react";
import SongList from "./SongList";

function AlbumDetails({ artist, album, onCloseAlbum, onDeleteSong }) {
  return (
    <div className="details">
      <h1 className={"box-title"}>{album.title}</h1>
      {album.description ? (
        <p className={"box-text"}>{album.description}</p>
      ) : (
        <p className="center-text-container">No data available. 🥺</p>
      )}
      {album.songs && album.songs.length > 0 ? (
        <SongList
          songs={album.songs}
          album={album.title}
          artist={artist.name}
          onDeleteSong={onDeleteSong}
        />
      ) : album.description ? (
        <p className="center-text-container">No data available. 🥺</p>
      ) : (
        ""
      )}
    </div>
  );
}

export default AlbumDetails;
