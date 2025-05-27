import React from "react";
import styles from './CharacterChoice.module.css';

// Liste des personnages avec leurs stats de départ
export const CHARACTERS = {
  forgeron: {
    name: "Forgeron du code",
    description: "Développeur, maître des outils et du DOM",
    startingGold: 2,
    startingAccessibilityScore: 3,
    image: "forgeron.png",
  },
  alchimiste: {
    name: "Alchimiste des pixels",
    description: "Designer, artisan de l'expérience visuelle",
    startingGold: 3,
    startingAccessibilityScore: 2,
    image: "alchimiste.png",
  },
  stratège: {
    name: "Stratège du royaume",
    description: "Chef de projet, gestionnaire de budget et de priorités",
    startingGold: 5,
    startingAccessibilityScore: 1,
    image: "strategiste.png",
  },
  mage: {
    name: "Mage des normes oubliées",
    description: "Expert accessibilité, gardien des grimoires RGAA",
    startingGold: 1,
    startingAccessibilityScore: 5,
    image: "mage.png",
  },
};

function CharacterChoice({ onStart }) {
  return (
    <div className="character-choice">
      <h2>Choisissez votre classe</h2>
      <ul className={styles.characterList}>
        {Object.entries(CHARACTERS).map(([key, character]) => (
          <li key={key} className="character-item">
            {/* Affichage de l'image du personnage */}
            <img
              src={`${process.env.PUBLIC_URL}/images/characters/${character.image}`}
              alt=""
              className="character-image"
            />
            <h3>{character.name}</h3>
            <p>{character.description}</p>
            <p>Pièces d'or : {character.startingGold}</p>
            <p>
              Score d'accessibilité initial :{" "}
              {character.startingAccessibilityScore}
            </p>
            <button onClick={() => onStart(character)}>Choisir<span className="visually-hidden"> la classe {character.name}</span></button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CharacterChoice;
