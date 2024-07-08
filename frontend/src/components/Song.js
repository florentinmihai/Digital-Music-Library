import React, { useState } from "react";
import ActionButtons from "./ActionButtons";
import EditButtons from "./EditButtons";

function Song({ artist, album, song, length, onDeleteSong, onUpdateSong }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(song.title);
  const [newLength, setNewLength] = useState(song.length);

  const handleDelete = () => {
    onDeleteSong(artist, album, song.title);
  };

  const handleSave = () => {
    onUpdateSong(artist, album, song.title, newTitle, newLength);
    setIsEditing(false);
  };

  return isEditing ? (
    <li>
      <input
        className={"edit-text-song"}
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <br /> <br />
      <input
        className={"edit-text-song-length"}
        type="text"
        value={newLength}
        onChange={(e) => setNewLength(e.target.value)}
      />
      <EditButtons
        onCancel={() => setIsEditing(false)}
        onSave={handleSave}
      ></EditButtons>
    </li>
  ) : song && song.title && song.length ? (
    <li className="list list-library">
      <h4>
        {song.title} ({song.length})
      </h4>

      <ActionButtons
        onDelete={handleDelete}
        onUpdate={() => setIsEditing(true)}
      />
    </li>
  ) : (
    <div className="center-text-container">Invalid song data. 🥺</div>
  );
}

export default Song;
