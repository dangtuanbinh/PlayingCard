import { render } from "@testing-library/react";
import React from "react";
import Card from "../Card";

const Player = (props) => {
  const renderCard = () => {
    return props.player.cards.map((card,index) => {
      return <Card card={card}  key={index} />
    });
  }
  return (
    <div className={`player-${props.player.index}`}>
      <p className="lead">{props.player.username}</p>
      <main className="d-flex">
        {renderCard}
      </main>
    </div>
  );
};

export default Player;
