import React, { useState } from "react";

function Artist({
  artist,
  onSelectArtist,
  onDeleteArtist,
  onUpdateArtist,
  isSelected,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(artist.name);

  const handleUpdate = () => {
    onUpdateArtist(artist.name, newName);
    setIsEditing(false);
  };

  return (
    <li className={isSelected ? "selected" : ""}>
      {isEditing ? (
        <>
          <input
            className={"edit-text"}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button className={"btn-save"} onClick={handleUpdate}>
            👍🏼
          </button>
          <button className={"btn-delete"} onClick={() => setIsEditing(false)}>
            👎🏼
          </button>
        </>
      ) : (
        <>
          <h3 onClick={() => onSelectArtist(artist)}>{artist.name}</h3>
          <button
            className={"btn-delete"}
            onClick={() => onDeleteArtist(artist.name)}
          >
            🗑️
          </button>
          <button className={"btn-update"} onClick={() => setIsEditing(true)}>
            ✏️
          </button>
        </>
      )}
    </li>
  );
}

export default Artist;
