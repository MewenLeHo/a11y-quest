import React from "react";

function ResultsPage({ score, gold, name, character }) {
  let ending =
    "Tu as rétabli un certain équilibre, mais le royaume reste fragile.";
  if (score >= 6) {
    ending =
      "Grâce à tes efforts, Accessibilia retrouve sa splendeur. Tu es acclamé comme héros du numérique.";
  } else if (score <= 0) {
    ending =
      "Hélas, les ténèbres persistent... Les utilisateurs souffrent encore dans l'ombre.";
  }

  return (
    <div className="results-page">
      <h2>🏰 Fin de la Quête</h2>
      <p>Nom : {name}</p>
      <p>Classe : {character?.label}</p>
      <p>Score d'accessibilité : {score}</p>
      <p>Or restant : {gold}</p>
      <p className="ending">{ending}</p>
      <p>
        Merci d’avoir guidé le royaume vers une meilleure expérience numérique !
      </p>
    </div>
  );
}

export default ResultsPage;
