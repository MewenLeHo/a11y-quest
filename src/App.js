import React, { useState } from "react";
import "./App.css";
import CharacterChoice from "./components/CharacterChoice";
import ScenarioSelector from "./components/ScenarioSelector";
import Game from "./components/Game";

function App() {
  const [playerName, setPlayerName] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [character, setCharacter] = useState(null);
  const [accessibilityScore, setAccessibilityScore] = useState(0);
  const [gold, setGold] = useState(0);

  const params = new URLSearchParams(window.location.search);
  const scenario = params.get("scenario");

  if (!scenario) {
    return <ScenarioSelector />;
  }

  if (!hasStarted) {
    return (
      <div className="App">
        <h1>A11y Quest : l'audit dont vous êtes le héros</h1>
        <div className="player-name-input">
          <label htmlFor="playerName">Entrez votre nom de personnage :</label>
          <input
            id="playerName"
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Entrez un nom..."
          />
          <button onClick={() => setHasStarted(true)} disabled={!playerName}>
            Commencer
          </button>
        </div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="App">
        <h1>A11y Quest : l'audit dont vous êtes le héros</h1>
        <CharacterChoice
          onStart={(chosenCharacter) => {
            setCharacter(chosenCharacter);
            setAccessibilityScore(
              chosenCharacter.startingAccessibilityScore || 0
            );
            setGold(chosenCharacter.startingGold || 0);
          }}
        />
      </div>
    );
  }

  return (
    <div className="App">
      <h1>A11y Quest : l'audit dont vous êtes le héros</h1>

      <Game
        character={character}
        gold={gold}
        setGold={setGold}
        accessibilityScore={accessibilityScore}
        setAccessibilityScore={setAccessibilityScore}
        playerName={playerName}
      />

      <div className="hud">
        <p>
          <span aria-hidden="true">🎖</span> Score A11y : {accessibilityScore} |{" "}
          <span aria-hidden="true">💰</span> Or : {gold}
        </p>
      </div>
    </div>
  );
}

export default App;
