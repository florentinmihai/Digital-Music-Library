import React from "react";
import Button from "./Button";

function ActionButtons({ onDelete, onUpdate }) {
  return (
    <>
      <Button className="btn-delete" onClick={onDelete}>
        🗑️
      </Button>
      <Button className="btn-update" onClick={onUpdate}>
        ✏️
      </Button>
    </>
  );
}

export default ActionButtons;
