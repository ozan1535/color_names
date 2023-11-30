import { useEffect, useState } from "react";
import { RgbColorPicker } from "react-colorful";
import "./App.css";

function App() {
  const [color, setColor] = useState({ r: 200, g: 150, b: 35 });
  const [colorName, setColorName] = useState("");
  const colorRange = 200;
  const canChangeColor =
    color.r > colorRange && color.g > colorRange && color.b > colorRange;
  useEffect(() => {
    fetch(
      `https://www.thecolorapi.com/id?rgb=${color.r},${color.g},${color.b}&format=json`
    )
      .then((response) => response.json())
      .then((data) => setColorName(data.name.value));
  }, [color]);

  return (
    <div
      className="App"
      style={{ background: `rgb(${color.r},${color.g},${color.b})` }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <RgbColorPicker color={color} onChange={setColor} />
        <div
          style={{
            paddingLeft: "5px",
            color: canChangeColor ? "currentcolor" : "white ",
          }}
        >
          <p>R: {color.r}</p>
          <p>G: {color.g}</p>
          <p>B: {color.b}</p>
        </div>
      </div>
      <h3 style={{ color: canChangeColor ? "currentcolor" : "white " }}>
        Color Name: {colorName}
      </h3>
    </div>
  );
}

export default App;
