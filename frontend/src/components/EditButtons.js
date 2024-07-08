import React from "react";
import Button from "./Button";

function EditButtons({ onSave, onCancel }) {
  return (
    <>
      <Button className="btn-delete" onClick={onCancel}>
        👎🏼
      </Button>
      <Button className="btn-save" onClick={onSave}>
        👍🏼
      </Button>
    </>
  );
}

export default EditButtons;
