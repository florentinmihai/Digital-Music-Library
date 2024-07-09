import React from "react";
import Album from "./Album";

function AlbumList({
  artist,
  onSelectAlbum,
  onDeleteAlbum,
  onUpdateAlbum,
  selectedAlbum,
  filteredAlbums,
}) {
  return filteredAlbums && filteredAlbums.length > 0 ? (
    <ul className="list list-library">
      {filteredAlbums.map((album) => (
        <Album
          album={album}
          key={album.title}
          onSelectAlbum={onSelectAlbum}
          onDeleteAlbum={onDeleteAlbum}
          onUpdateAlbum={onUpdateAlbum}
          artistName={artist.name}
          isSelected={selectedAlbum && selectedAlbum.title === album.title}
        />
      ))}
    </ul>
  ) : (
    <div className="details">
      <p className="box-text-no-data">
        No albums available.<br></br>Start by adding an album. ✏️💿
      </p>
    </div>
  );
}

export default AlbumList;
