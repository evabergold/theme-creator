import "./Color.css";
import { useState } from "react";
import ColorForm from "../ColorForm/ColorForm.jsx";

export default function Color({ color, onDeleteColor, onEditColor }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [editMode, setEditMode] = useState(false);

  function handleDelete() {
    if (showConfirmation === false) {
      setShowConfirmation(true);
    } else {
      onDeleteColor(color.id);
    }
  }

  function handleCancel() {
    setShowConfirmation(false);
  }

  function handleEdit() {
    setEditMode(true);
  }
  function handleCancelEdit() {
    setEditMode(false);
  }

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-highlight">{color.hex}</h3>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>
      {editMode && (
        <>
          <ColorForm
            initialData={color}
            isEdit={editMode}
            onEditColor={onEditColor}
            isChanged={setEditMode}
          />
          <br />
          <button type="button" onClick={handleCancelEdit}>
            CANCEL
          </button>
        </>
      )}

      {showConfirmation && (
        <>
          <p className="color-card-highlight">Really delete?</p>
          <button type="button" onClick={handleCancel}>
            CANCEL
          </button>
          <button type="button" onClick={handleDelete}>
            DELETE
          </button>
        </>
      )}
      {!showConfirmation && !editMode && (
        <>
          <button type="button" onClick={handleDelete}>
            DELETE
          </button>
          <button type="button" onClick={handleEdit}>
            EDIT
          </button>
        </>
      )}
    </div>
  );
}
