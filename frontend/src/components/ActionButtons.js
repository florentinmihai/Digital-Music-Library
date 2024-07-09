import React from "react";
import Button from "./Button";

function ActionButtons({ onDelete, onUpdate }) {
  const handleDeleteClick = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      onDelete();
    }
  };

  return (
    <>
      <Button className="btn-delete" onClick={handleDeleteClick}>
        🗑️
      </Button>
      <Button className="btn-update" onClick={onUpdate}>
        ✏️
      </Button>
    </>
  );
}

export default ActionButtons;
