import React, { useState } from "react";
import AddForm from "./AddForm";

function Box({
  title,
  children,
  handleAdd,
  newEntry,
  setNewEntry,
  newSongLength,
  setNewSongLength,
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "-" : "+"}
      </button>
      <h1 className={"box-title"}>{title}</h1>
      {isOpen ? (
        <AddForm
          handleAdd={handleAdd}
          newEntry={newEntry}
          setNewEntry={setNewEntry}
          title={title}
          newSongLength={newSongLength}
          setNewSongLength={setNewSongLength}
        />
      ) : (
        ""
      )}
      {children}
    </div>
  );
}

export default Box;
