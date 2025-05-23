import React from "react";
import styles from './ResultsPage.module.css';

function generateEnding(score) {
  if (score >= 6) {
    return {
      title: "Héros d'Accessibilia",
      text: "Grâce à tes efforts, Accessibilia retrouve sa splendeur. Tu es acclamé comme héros du numérique.",
      image: "victory.png",
      alt: "Le royaume rayonne de lumière, les interfaces sont claires et inclusives.",
    };
  } else if (score <= 0) {
    return {
      title: "Ombre de la négligence",
      text: "Hélas, les ténèbres persistent... Les utilisateurs souffrent encore dans l'ombre.",
      image: "failure.png",
      alt: "Le royaume est plongé dans le noir, les interfaces sont illisibles.",
    };
  } else {
    return {
      title: "Gardien du juste milieu",
      text: "Tu as rétabli un certain équilibre, mais le royaume reste fragile.",
      image: "neutral.png",
      alt: "Un rayon de lumière perce les nuages, mais tout n'est pas encore gagné.",
    };
  }
}

function endingClass(score) {
  if (score >= 6) return "victory";
  if (score <= 0) return "failure";
  return "neutral";
}

function ResultsPage({ score, gold, name, character }) {
  const ending = generateEnding(score);

  return (
    <div className={`${styles.resultsPage} ${styles[endingClass(score)]}`}>
      <h2>
        <span aria-hidden="true">🏰</span> Fin de la Quête
      </h2>
      <h3>{ending.title}</h3>
      <img
        src={`${process.env.PUBLIC_URL}/images/scores/${ending.image}`}
        alt=""
        className={styles.endingImage }
      />

      <p>Nom : {name}</p>
      <p>Classe : {character?.name}</p>
      <p>Score d'accessibilité : {score}</p>
      <p>Or restant : {gold}</p>
      <p className="ending">{ending.text}</p>

      <p>
        Merci d'avoir guidé le royaume vers une meilleure expérience numérique !
      </p>

      <button onClick={() => window.location.reload()}>Rejouer la quête</button>
    </div>
  );
}

export default ResultsPage;
