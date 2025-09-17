import { useState } from "react";
import "./App.css";

type Participant = {
  name: string;
  handRaised: boolean;
  countTimesHandRaised: number;
  countTimesSpoken: number;
};

const createParticipant = (
  name: string,
  handRaised: boolean = false,
): Participant => ({
  name,
  handRaised,
  countTimesHandRaised: 0,
  countTimesSpoken: 0,
});

function App() {
  const [nameInputValue, setNameInputValue] = useState<string>("");
  const [nameInputError, setNameInputError] = useState<
    "participant-already-exists" | null
  >(null);
  const [participants, setParticipants] = useState<Participant[]>([]);

  const addParticipant = (handRaised: boolean) => () => {
    if (participants.find(({ name }) => name === nameInputValue)) {
      setNameInputError("participant-already-exists");
      return;
    }

    setNameInputValue("");
    setParticipants([
      ...participants,
      createParticipant(nameInputValue, handRaised),
    ]);
  };

  return (
    <>
      <form action={addParticipant(true)}>
        <input
          value={nameInputValue}
          onChange={(e) => setNameInputValue(e.target.value)}
        ></input>
        <button value="submit">add</button>
        <label>gnarf</label>
      </form>
      <ul>
        {participants.map(({ name }) => (
          <li>{name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
