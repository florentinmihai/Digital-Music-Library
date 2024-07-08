import React from "react";

function AddForm({ handleAdd, newEntry, setNewEntry, title }) {
  return (
    <form className="list list-library" onSubmit={(e) => handleAdd(e)}>
      <li>
        <input
          className="edit-text"
          type="text"
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder={
            title === "Details 📃"
              ? "New song... "
              : title === "Albums 💿"
              ? "New album.."
              : title === "Artists 🎤"
              ? "New artist..."
              : ""
          }
          required
        />
        <button className="btn-add" type="submit">
          Add
        </button>
      </li>
    </form>
  );
}

export default AddForm;
