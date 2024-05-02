import "./Color.css";
import { useState } from "react";

export default function Color({ color, onDeleteColor }) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  function handleDelete(id) {
    if (showConfirmation === false) {
      setShowConfirmation(true);
    } else {
      onDeleteColor(color.id);
    }
  }

  function handleCancel() {
    setShowConfirmation(false);
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
      {showConfirmation && (
        <>
          <p className="color-card-highlight">Really delete?</p>
          <button type="button" onClick={handleCancel}>
            CANCEL
          </button>
        </>
      )}
      <button type="button" onClick={handleDelete}>
        DELETE
      </button>
    </div>
  );
}
