import React, { useEffect, useState } from "react";
import QuestionPage from "./QuestionPage";
import { CHARACTERS } from "./CharacterChoice";
import ResultsPage from "./ResultsPage";

function getCharacterKey(characterObject) {
  if (!characterObject || !characterObject.name) return undefined;
  return Object.keys(CHARACTERS).find(
    (key) => CHARACTERS[key].name === characterObject.name
  );
}

function mergeVariant(scene, characterKey) {
  const variant = scene.variants?.[characterKey];
  if (!variant) return scene;

  return {
    ...scene,
    ...variant,
    variants: undefined,
  };
}

function getScenarioIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("scenario") || "demo";
}

function Game({
  character,
  gold,
  setGold,
  accessibilityScore,
  setAccessibilityScore,
  playerName,
}) {
  const [scenarioData, setScenarioData] = useState(null);
  const [currentSceneId, setCurrentSceneId] = useState("intro");

  useEffect(() => {
    const scenarioId = getScenarioIdFromURL();
    const url = `${process.env.PUBLIC_URL}/data/scenarios/${scenarioId}.json`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setScenarioData(data);

        const characterKey = getCharacterKey(character);
        const customIntroId = `intro-${characterKey}`;
        const hasCustomIntro = data.scenes.some((s) => s.id === customIntroId);
        const hasGenericIntro = data.scenes.some((s) => s.id === "intro");

        setCurrentSceneId(
          hasCustomIntro
            ? customIntroId
            : hasGenericIntro
            ? "intro"
            : "missing-intro"
        );
      })
      .catch((error) => {
        console.error("Erreur chargement scénario :", error);
      });
  }, [character]);

  const handleChoice = (consequences, nextSceneId) => {
    if (typeof consequences.gold === "number") {
      setGold((prev) => prev + consequences.gold);
    }
    if (typeof consequences.accessibilityScore === "number") {
      setAccessibilityScore((prev) => prev + consequences.accessibilityScore);
    }
    setCurrentSceneId(nextSceneId);
  };

  if (!scenarioData) {
    return <p>Chargement du scénario en cours...</p>;
  }

  if (currentSceneId === "missing-intro") {
    return (
      <div>
        <h2>Erreur dans le scénario</h2>
        <p>Aucune scène d’introduction trouvée pour ce personnage.</p>
        <p>
          Vérifie que le scénario contient une scène "intro" ou
          "intro-[personnage]".
        </p>
      </div>
    );
  }

  const rawScene = scenarioData.scenes.find((s) => s.id === currentSceneId);
  if (!rawScene) {
    return (
      <div>
        <h2>Scène introuvable</h2>
        <p>Identifiant : {currentSceneId}</p>
        <p>Vérifie que la scène est bien définie dans le scénario.</p>
      </div>
    );
  }

  const scene = mergeVariant(rawScene, getCharacterKey(character));
  const origin = getCharacterKey(character);
  const isGameOver = scene.choices.length === 0;

  return (
    <>
      {isGameOver ? (
        <ResultsPage
          score={accessibilityScore}
          gold={gold}
          name={playerName}
          character={character}
        />
      ) : (
        <QuestionPage
          scene={scene}
          onChoice={handleChoice}
          gold={gold}
          accessibilityScore={accessibilityScore}
          origin={origin}
        />
      )}
    </>
  );
}

export default Game;
