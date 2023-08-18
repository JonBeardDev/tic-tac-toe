import React, { useState } from "react";
import rabbit from "../images/rabbit.png";
import rabbit_select from "../images/rabbit-select.png";
import fox from "../images/fox.png";
import fox_select from "../images/fox-select.png";
import owl from "../images/owl.png";
import owl_select from "../images/owl-select.png";
import human from "../images/human.png";
import human_select from "../images/human-select.png";
import "./Menu.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Menu() {
  const history = useHistory();
  const [opponent, setOpponent] = useState("rabbit");
  const [opponentText, setOpponentText] = useState(
    "Bad Bunny has never played Tic Tac Toe before and isn't even sure of the rules."
  );
  const [difficulty, setDifficulty] = useState("Easy");

  const clickHandler = (target) => {
    setOpponent(target);
    switch (target) {
      case "rabbit":
        setOpponentText(
          "Bad Bunny has never played Tic Tac Toe before and isn't even sure of the rules."
        );
        setDifficulty("Easy");
        break;
      case "fox":
        setOpponentText(
          "Sly Fox is hiding some moves up his sleeves, but may occasionally be distracted by a squirrel."
        );
        setDifficulty("Medium");
        break;
      case "owl":
        setOpponentText(
          "Wise Owl is a Tic Tac Toe genius and has never been beaten!"
        );
        setDifficulty("Impossible");
        break;
      case "human":
      default:
        setOpponentText("Challenge a friend to a game of Tic Tac Toe.");
        setDifficulty("Human");
    }
  };

  const startHandler = (event) => {
    event.preventDefault();
    history.push(`/game/${difficulty}`);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex flex-column justify-content-center border border-light border-2 rounded rounded-3 p-5 mx-5 game-frame">
        <h2 className="text-white fs-2 text-center pb-3">
          Choose Your Opponent
        </h2>
        <div className="d-flex justify-content-evenly pb-3">
          <div
            className="d-flex flex-column justify-content-center"
            onClick={() => clickHandler("rabbit")}
          >
            <div className="img-container">
              {opponent === "rabbit" ? (
                <img src={rabbit_select} alt="Bad Bunny Logo (selected)" />
              ) : (
                <img src={rabbit} alt="Bad Bunny Logo (not selected)" />
              )}
            </div>
            <h4 className="text-center text-white level">Bad Bunny</h4>
          </div>
          <div
            className="d-flex flex-column justify-content-center"
            onClick={() => clickHandler("fox")}
          >
            <div className="img-container">
              {opponent === "fox" ? (
                <img src={fox_select} alt="Sly Fox Logo (selected)" />
              ) : (
                <img src={fox} alt="Sly Fox Logo (not selected)" />
              )}
            </div>
            <h4 className="text-center text-white level">Sly Fox</h4>
          </div>
          <div
            className="d-flex flex-column justify-content-center"
            onClick={() => clickHandler("owl")}
          >
            <div className="img-container">
              {opponent === "owl" ? (
                <img src={owl_select} alt="Wise Owl Logo (selected)" />
              ) : (
                <img src={owl} alt="Wise Owl Logo (not selected)" />
              )}
            </div>
            <h4 className="text-center text-white level">Wise Owl</h4>
          </div>
          <div
            className="d-flex flex-column justify-content-center"
            onClick={() => clickHandler("human")}
          >
            <div className="img-container">
              {opponent === "human" ? (
                <img src={human_select} alt="Two Players Logo (selected)" />
              ) : (
                <img src={human} alt="Two Players Logo (not selected)" />
              )}
            </div>
            <h4 className="text-center text-white level">Two Player</h4>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-center gap-2 text-center text-white pt-3">
          <h3 className="level difficulty">{difficulty}</h3>
          <h5 className="level difficulty">{opponentText}</h5>
        </div>
        <div className="d-flex justify-content-center pt-3">
          <button className="btn-lg start text-white" onClick={startHandler}>
            Start Game!
          </button>
        </div>
      </div>
    </div>
  );
}

export default Menu;
