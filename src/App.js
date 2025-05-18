import React, { useState } from "react";
import "./App.css";
import gameData from "./data/gameData.json";
import CharacterChoice from "./components/CharacterChoice";
import QuestionPage from "./components/QuestionPage";
import ResultsPage from "./components/ResultsPage";

function App() {
  const [playerName, setPlayerName] = useState("");
  const [character, setCharacter] = useState(null);
  const [accessibilityScore, setAccessibilityScore] = useState(0);
  const [gold, setGold] = useState(0);
  const [currentSceneId, setCurrentSceneId] = useState("intro");
  const [hasStarted, setHasStarted] = useState(false);

  const handleCharacterChoice = (chosenCharacter) => {
    setCharacter(chosenCharacter);
    setAccessibilityScore(chosenCharacter.startingAccessibilityScore || 0);
    setGold(chosenCharacter.startingGold || 0);
  };

  const handleChoice = (consequences, nextSceneId) => {
    if (consequences.accessibilityScore) {
      setAccessibilityScore((prev) => prev + consequences.accessibilityScore);
    }
    if (typeof consequences.gold !== "undefined") {
      setGold((prev) => prev + consequences.gold);
    }
    setCurrentSceneId(nextSceneId);
  };

  const currentScene = gameData.scenes.find(
    (scene) => scene.id === currentSceneId
  );

  const isGameOver = currentScene && currentScene.choices.length === 0;

  return (
    <div className="App">
      <h1>A11y Quest : l'audit dont vous êtes le héros</h1>

      {!hasStarted ? (
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
      ) : !character ? (
        <CharacterChoice onStart={handleCharacterChoice} />
      ) : isGameOver ? (
        <ResultsPage
          score={accessibilityScore}
          gold={gold}
          name={playerName}
          character={character}
        />
      ) : (
        <QuestionPage
          scene={currentScene}
          onChoice={handleChoice}
          accessibilityScore={accessibilityScore}
          gold={gold}
        />
      )}

      {character && (
        <div className="hud">
          <p>
            🎖 Score A11y : {accessibilityScore} | 💰 Or : {gold}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
