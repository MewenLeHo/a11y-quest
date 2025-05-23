import React, { useState } from "react";
import styles from "./QuestionPage.module.css";

function QuestionPage({ scene, onChoice, accessibilityScore, gold }) {
  const [narration, setNarration] = useState("");

  const handleChoiceClick = (choice) => {
    const { consequences, nextScene } = choice;
    setNarration(consequences.narration || "");
    setTimeout(() => {
      setNarration("");
      onChoice(consequences, nextScene);
    }, 2000); // délai pour afficher la narration avant de passer à la scène suivante
  };

  return (
    <div className="question-page">
      <h2>{scene.title}</h2>
      <p>{scene.description}</p>
      {scene.image && (
        <img src={`/images/${scene.image}`} alt="" className="scene-image" />
      )}

      <div className={styles.choices}>
        {scene.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleChoiceClick(choice)}
            className="choice-button"
            disabled={gold + (choice.consequences.gold ?? 0) < 0} // désactive si pas assez d'or
          >
            {choice.image && (
              <img
                src={`/images/${choice.image}`}
                alt=""
                className="choice-image"
              />
            )}
            <span>{choice.text}</span>
            <span className={styles.goldInfo}>
            {choice.consequences.gold < 0
              ? <><span aria-hidden="true">💰</span> -{Math.abs(choice.consequences.gold)} or</>
              : choice.consequences.gold > 0
              ? <><span aria-hidden="true">💰</span> +{choice.consequences.gold} or</>
              : ""}
          </span>
          </button>
        ))}
      </div>

      {narration && (
        <div className="narration" aria-live="polite">
          <p>
            <em>{narration}</em>
          </p>
        </div>
      )}
    </div>
  );
}

export default QuestionPage;
