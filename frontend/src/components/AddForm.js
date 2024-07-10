import React from "react";

function AddForm({
  handleAdd,
  newEntry,
  setNewEntry,
  title,
  newSongLength,
  setNewSongLength,
}) {
  const handleSongLengthChange = (e) => {
    let value = e.target.value;

    // Remove any non-digit or non-colon characters
    value = value.replace(/[^\d:]/g, "");

    // Automatically add colon after two digits
    if (value.length > 2 && value[2] !== ":") {
      value = value.slice(0, 2) + ":" + value.slice(2);
    }

    // Limit to AA:BB format
    if (/^\d{0,2}:?\d{0,2}$/.test(value)) {
      setNewSongLength(value);
    }
  };

  return (
    <div>
      <form className="list list-library" onSubmit={(e) => handleAdd(e)}>
        <li>
          <input
            className="edit-text-song"
            type="text"
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder={
              title === "Songs 🎧"
                ? "New song... "
                : title === "Albums 💿"
                ? "New album..."
                : title === "Artists 🎤"
                ? "New artist..."
                : ""
            }
            required
          />
          {title === "Songs 🎧" && (
            <input
              className="edit-text-song-add-length"
              type="text"
              value={newSongLength}
              onChange={handleSongLengthChange}
              placeholder={"00:00"}
              pattern="^\d{2}:\d{2}$"
              required
            />
          )}
          <button className="btn-add" type="submit">
            Add
          </button>
        </li>
      </form>
    </div>
  );
}

export default AddForm;
