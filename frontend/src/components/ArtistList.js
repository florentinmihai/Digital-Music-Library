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
    <div className={"details"}>
      <p className={"box-text-no-data"}>
        No artists available. <br></br>
        Start by adding an artsit. ✏️💿
      </p>
    </div>
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
