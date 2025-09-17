import { useState } from "react";
import "./App.css";

function App() {
  const [nameInput, setNameInput] = useState<string>("");
  const [names, setNames] = useState<string[]>([]);

  const addName = (name: string) => setNames([...names, name]);

  return (
    <>
      <input onChange={(e) => setNameInput(e.target.value)}></input>
      <button onClick={() => addName(nameInput)}>add</button>
      <ul>
        {names.map((name) => (
          <li>{name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
