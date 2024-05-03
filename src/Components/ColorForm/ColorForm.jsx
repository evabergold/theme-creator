import ColorInput from "../ColorInput/ColorInput";
import "./ColorForm.css";

export default function ColorForm({
  onAddColor,
  initialData = { role: "some color", hex: "#123456", contrastText: "#ffffff" },
  onEditColor,
  isEdit,
  isChanged,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (isEdit) {
      data.id = initialData.id;
      onEditColor(data);
      isChanged(false);
    } else {
      onAddColor(data);
    }
  }

  return (
    <form className="color-form" onSubmit={handleSubmit}>
      <label htmlFor="role">
        Role
        <br />
        <input
          type="text"
          id="role"
          name="role"
          defaultValue={initialData.role}
        />
      </label>
      <br />
      <label htmlFor="hex">
        Hex
        <br />
        <ColorInput id="hex" defaultValue={initialData.hex} />
      </label>
      <br />
      <label htmlFor="contrastText">
        Contrast Text
        <br />
        <ColorInput id="contrastText" defaultValue={initialData.contrastText} />
      </label>
      <br />
      {isEdit ? (
        <button type="submit">UPDATE COLOR</button>
      ) : (
        <button type="submit">ADD COLOR</button>
      )}
    </form>
  );
}
