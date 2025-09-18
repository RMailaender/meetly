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
  countTimesHandRaised: handRaised ? 1 : 0,
  countTimesSpoken: 0,
});

const SpeakersList: React.FunctionComponent<{
  speakers: Participant[];
  onLowerHand: (speakerName: string) => void;
}> = ({ speakers, onLowerHand }) => {
  if (speakers.length === 0) {
    return null;
  }

  return (
    <>
      <ul>
        {speakers.map(({ name }) => (
          <li key={name} onClick={() => onLowerHand(name)}>
            {name}
          </li>
        ))}
      </ul>
    </>
  );
};

function App() {
  // TODO: Enter Key should create Participant too
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

  const raiseHand = (participantName: string) =>
    setParticipants(
      participants.map((current) =>
        current.name === participantName
          ? { ...current, handRaised: true }
          : current,
      ),
    );

  const lowerHand = (participantName: string) =>
    setParticipants(
      participants.map((current) =>
        current.name === participantName
          ? { ...current, handRaised: false }
          : current,
      ),
    );

  const onNameInputChange = (value: string) => {
    setNameInputError(null);
    setNameInputValue(value);
  };

  return (
    <>
      <SpeakersList
        onLowerHand={lowerHand}
        speakers={participants.filter(({ handRaised }) => handRaised)}
      />
      <form action={addParticipant(true)}>
        <input
          value={nameInputValue}
          onChange={(e) => onNameInputChange(e.target.value)}
        ></input>
        <button value="submit">Meldung</button>
        <button formAction={addParticipant(false)}>+</button>
        {nameInputError === "participant-already-exists" ? (
          <label>gnarf</label>
        ) : null}
      </form>
      <ul>
        {participants
          .filter(({ handRaised }) => !handRaised)
          .map(({ name }) => (
            <li key={name} onClick={() => raiseHand(name)}>
              {name}
            </li>
          ))}
      </ul>
    </>
  );
}

export default App;
