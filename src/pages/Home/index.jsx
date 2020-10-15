import React from "react";
import Game from "../Game/index";
import { useState } from "react";
// Hàm useDispatch thay thế {connect}
import {useDispatch} from 'react-redux';

const Home = () => {
  // cú pháp useState const [tên state, function để sét lại state] = useState(trạng thái của state);
  const [gameStart, setGameStart] = useState(false);
  // Function set state trong react hook sẽ ghi đè lên state cũ => gây mất giá trị. nên phải clone lại dùng "...state"
  const dispatch = useDispatch();
  const startGame =  () => {
    setGameStart(true);
    dispatch({
      type: "SET_NAME",
      payload: playerName,
    });
  };
 
  const [playerName,setPlayerName] = useState("");
  const handleChange = (e) => {
    setPlayerName(e.target.value);
  }
  return (
    <>
    {/* Tạo điều kiện để in ra màn hình game */}
      {gameStart ? (
        <Game />
      ) : (
        <div
          className="text-center"
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 className="diplay-4 mb-5"> Welcome to Pocker Center</h1>
          <h3>Fill your name and start</h3>
          <input type="input" className="w-25 form-control mb-3" onChange={handleChange}/>
          <button className="btn btn-success" onClick={startGame}>
            Start new Game
          </button>
        </div>
      )}
    </>
  );
};

export default Home;
