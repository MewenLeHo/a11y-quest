import React, { useState } from "react";
import styles from "./QuestionPage.module.css";

function QuestionPage({ scene, onChoice, accessibilityScore, gold, origin }) {
  const [narration, setNarration] = useState("");

  if (!scene) {
    return <div>Chargement de la scène...</div>;
  }

  const handleChoiceClick = (choice) => {
    const { consequences, nextScene } = choice;

    let narrationText = "";

    if (
      consequences?.narrationByOrigin &&
      typeof consequences.narrationByOrigin === "object" &&
      origin
    ) {
      narrationText =
        consequences.narrationByOrigin[origin] ||
        consequences.narration ||
        "Tu continues ta route...";
    } else {
      narrationText = consequences?.narration || "Tu continues ta route...";
    }

    setNarration(narrationText);

    setTimeout(() => {
      setNarration("");
      onChoice(consequences, nextScene);
    }, 2000);
  };

  return (
    <div className="question-page">
      <h2>{scene.title}</h2>
      <p>{scene.description}</p>

      {scene.image && (
        <img src={`/images/${scene.image}`} alt="" className="scene-image" />
      )}

      <div className={styles.choices}>
        {scene.choices?.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleChoiceClick(choice)}
            className="choice-button"
            disabled={gold + (choice.consequences?.gold ?? 0) < 0}
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
              {choice.consequences?.gold < 0 ? (
                <>
                  <span aria-hidden="true">💰</span> -
                  {Math.abs(choice.consequences.gold)} or
                </>
              ) : choice.consequences?.gold > 0 ? (
                <>
                  <span aria-hidden="true">💰</span> +{choice.consequences.gold}{" "}
                  or
                </>
              ) : (
                ""
              )}
            </span>
          </button>
        ))}
      </div>

      <div className={styles.narrationWrapper}>
        {narration && (
          <div className={styles.narration} aria-live="polite">
            <p>
              <em>{narration}</em>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionPage;
