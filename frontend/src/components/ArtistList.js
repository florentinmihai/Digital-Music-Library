import React from "react";
import Artist from "./Artist";

function ArtistList({
  list,
  onSelectArtist,
  onDeleteArtist,
  onUpdateArtist,
  selectedArtist,
}) {
  return list.length === 0 ? (
    <div className="center-text-container">No data available. 🥺</div>
  ) : (
    <ul className="list list-library">
      {list.map((artist) => (
        <Artist
          artist={artist}
          key={artist.name}
          onSelectArtist={onSelectArtist}
          onDeleteArtist={onDeleteArtist}
          onUpdateArtist={onUpdateArtist}
          isSelected={selectedArtist && selectedArtist.name === artist.name}
        />
      ))}
    </ul>
  );
}

export default ArtistList;
