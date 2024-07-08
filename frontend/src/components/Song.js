import React from "react";
import ActionButtons from "./ActionButtons";
import EditButtons from "./EditButtons";

function Song({ artist, album, song, onDeleteSong }) {
  const handleDelete = () => {
    onDeleteSong(artist, album, song.title);
  };

  return song && song.title && song.length ? (
    <li className="list list-library">
      <span>
        {song.title} ({song.length})
      </span>

      <ActionButtons
        onDelete={handleDelete}
        //onUpdate={() => setIsEditing(true)}
      />
    </li>
  ) : (
    <div className="center-text-container">Invalid song data. 🥺</div>
  );
}

export default Song;
