import React, { useState } from "react";

function Box({ title, children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "-" : "+"}
      </button>
      <h1 className={"box-title"}>{title}</h1>
      {isOpen && children}
    </div>
  );
}

export default Box;
