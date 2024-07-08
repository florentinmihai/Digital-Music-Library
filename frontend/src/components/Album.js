import React, { useState } from "react";
import ActionButtons from "./ActionButtons";
import EditButtons from "./EditButtons";

function Album({
  album,
  onSelectAlbum,
  onDeleteAlbum,
  onUpdateAlbum,
  artistName,
  isSelected,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(album.title);
  const [newDescription, setNewDescription] = useState(album.description);

  const handleUpdate = () => {
    onUpdateAlbum(artistName, album.title, newTitle, newDescription);
    setIsEditing(false);
  };

  return (
    <li className={isSelected ? "selected" : ""}>
      {isEditing ? (
        <>
          <input
            className={"edit-text"}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <br />
          <br />
          <textarea
            className={"edit-text-description"}
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <EditButtons
            onSave={handleUpdate}
            onCancel={() => setIsEditing(false)}
          ></EditButtons>
        </>
      ) : (
        <>
          <h4 onClick={() => onSelectAlbum(album)}>{album.title}</h4>

          <ActionButtons
            onDelete={() => onDeleteAlbum(artistName, album.title)}
            onUpdate={() => setIsEditing(true)}
          />
        </>
      )}
    </li>
  );
}

export default Album;
