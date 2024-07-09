import React, { useState } from "react";
import ActionButtons from "./ActionButtons";
import EditButtons from "./EditButtons";

function Song({ artist, album, song, onDeleteSong, onUpdateSong }) {
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

  const handleLengthChange = (e) => {
    let value = e.target.value;

    // Remove any non-digit or non-colon characters
    value = value.replace(/[^\d:]/g, "");

    // Automatically add colon after two digits
    if (value.length > 2 && value[2] !== ":") {
      value = value.slice(0, 2) + ":" + value.slice(2);
    }

    // Limit to AA:BB format and validate BB is not greater than 59
    const parts = value.split(":");
    if (parts.length > 1 && parseInt(parts[1], 10) > 59) {
      return; // Prevent update if BB is greater than 59
    }

    if (/^\d{0,2}:?\d{0,2}$/.test(value)) {
      setNewLength(value);
    }
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
        onChange={handleLengthChange}
        placeholder={"00:00"}
        pattern="^\d{2}:\d{2}$"
        required
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
