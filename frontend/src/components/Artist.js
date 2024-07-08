import React, { useState } from "react";
import ActionButtons from "./ActionButtons";
import EditButtons from "./EditButtons";

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

          <EditButtons
            onSave={handleUpdate}
            onCancel={() => setIsEditing(false)}
          ></EditButtons>
        </>
      ) : (
        <>
          <h3 onClick={() => onSelectArtist(artist)}>{artist.name}</h3>
          <ActionButtons
            onDelete={() => onDeleteArtist(artist.name)}
            onUpdate={() => setIsEditing(true)}
          />
        </>
      )}
    </li>
  );
}

export default Artist;
