import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm.jsx";
import { uid } from "uid";
import { useState } from "react";

function App() {
  const [colors, setColors] = useState(initialColors);

  const emptyList = colors.length === 0;

  function handleAddColor(newColor) {
    setColors([{ id: uid(), ...newColor }, ...colors]);
  }

  function handleDeleteColor(id) {
    const newColorList = colors.filter((color) => color.id !== id);
    setColors(newColorList);
  }

  function handleEditColor(editedColor) {
    setColors(
      colors.map((color) => {
        if (color.id === editedColor.id) return editedColor;
        return color;
      })
    );
  }

  return (
    <>
      <h1>Theme Creator</h1>

      <ColorForm onAddColor={handleAddColor} />
      <br />

      {colors.map((color) => {
        return (
          <Color
            key={color.id}
            color={color}
            onDeleteColor={handleDeleteColor}
            onEditColor={handleEditColor}
          />
        );
      })}
      {emptyList && "No colors...start by adding one!"}
    </>
  );
}
export default App;
