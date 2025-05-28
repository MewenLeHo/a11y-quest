import React from "react";
import styles from "./ScenarioSelector.module.css";

const SCENARIOS = [
  {
    id: "demo",
    title: "Scénario Démo",
    description: "Une courte introduction à l'accessibilité.",
    image: "/images/scenarios/demo.png",
  },
  {
    id: "test",
    title: "WIP",
    description: "WIP",
    image: "/images/scenarios/formation.png",
  },
];

function ScenarioSelector() {
  const handleScenarioClick = (id) => {
    window.location.href = `?scenario=${id}`;
  };

  return (
    <div className={styles.scenarioSelector}>
      <h1>Entrez dans l'univers de l'accessibilité</h1>
      <h2>Choisissez votre scénario</h2>
      <p>
        <p>
          Plongez dans des aventures interactives où chaque choix vous confronte
          à des situations d'accessibilité web concrètes. Apprenez en jouant,
          explorez les bonnes pratiques, et devenez un héros du numérique
          inclusif !
        </p>
      </p>
      <ul className={styles.scenarioList}>
        {SCENARIOS.map((scenario) => (
          <li key={scenario.id} className={styles.scenarioCard}>
            <img src={`${process.env.PUBLIC_URL}${scenario.image}`} alt="" />
            <h3>{scenario.title}</h3>
            <p>{scenario.description}</p>
            <button onClick={() => handleScenarioClick(scenario.id)}>
              Jouer ce scénario
              <span className="visually-hidden">: {scenario.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScenarioSelector;
