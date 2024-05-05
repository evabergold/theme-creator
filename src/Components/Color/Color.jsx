import "./Color.css";
import { useState, useEffect } from "react";
import ColorForm from "../ColorForm/ColorForm.jsx";
import { writeClipboardText } from "../CopyToClipboard.jsx";

export default function Color({ color, onDeleteColor, onEditColor }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [copyMode, setCopyMode] = useState(false);
  const [checkContrast, setCheckContrast] = useState("");

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

  function handleCopy() {
    setCopyMode(true);
    writeClipboardText(color.hex);
  }

  useEffect(() => {
    let timeoutId;
    if (copyMode) {
      timeoutId = setTimeout(() => {
        setCopyMode(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [copyMode]);

  useEffect(() => {
    async function checkContrastStatus() {
      const response = await fetch(
        "https://www.aremycolorsaccessible.com/api/are-they",
        {
          method: "POST",
          body: JSON.stringify({ colors: [color.hex, color.contrastText] }),
          type: "application/json",
        }
      );
      const result = await response.json();
      console.log(result.overall);
      setCheckContrast(result.overall);
    }
    checkContrastStatus();
  }, [color.hex, color.contrastText]);

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-highlight">{color.hex}</h3>
      <button onClick={handleCopy}>
        {copyMode ? "SUCCESSFULLY COPIED!" : "COPY"}
      </button>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>
      <span
        className={`${
          checkContrast === "Yup"
            ? "color-contrast-yup"
            : checkContrast === "Nope"
            ? "color-contrast-nope"
            : checkContrast === "Kinda"
            ? "color-contrast-kinda"
            : ""
        }`}
      >
        Overall Contrast Status: {checkContrast}
      </span>
      <br />

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
