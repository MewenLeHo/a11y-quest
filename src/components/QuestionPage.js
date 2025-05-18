import React, { useState } from "react";

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

      <div className="choices">
        {scene.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleChoiceClick(choice)}
            className="choice-button"
          >
            {choice.image && (
              <img
                src={`/images/${choice.image}`}
                alt=""
                className="choice-image"
              />
            )}
            <span>{choice.text}</span>
          </button>
        ))}
      </div>

      {narration && (
        <div className="narration">
          <p>
            <em>{narration}</em>
          </p>
        </div>
      )}
    </div>
  );
}

export default QuestionPage;
