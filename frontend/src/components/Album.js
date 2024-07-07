import React, { useState } from "react";

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
          <button className={"btn-save"} onClick={handleUpdate}>
            👍🏼
          </button>
          <button className={"btn-delete"} onClick={() => setIsEditing(false)}>
            👎🏼
          </button>
        </>
      ) : (
        <>
          <h4 onClick={() => onSelectAlbum(album)}>{album.title}</h4>
          <button
            className={"btn-delete"}
            onClick={() => onDeleteAlbum(artistName, album.title)}
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

export default Album;
