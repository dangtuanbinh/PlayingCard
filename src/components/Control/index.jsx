import React from "react";
// useSelector như useDispatch
import { useSelector } from "react-redux";
import { useCallback } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
const Control = () => {
  const dispatch = useDispatch();

  const playerList = useSelector((state) => {
    return state.player.playerList;
  });

  const deskCard = useSelector((state) => {
    return state.card.deckCard;
  });
  console.log(deskCard);

  // Bọc hàm render lại bằng useCallback để kiểm soát việc render tự động của component, tránh giảm permance của web
  const renderPlayer = useCallback(() => {
    return playerList.map((player, index) => {
      return (
        <div className="border px-3 text-center">
          <p>{player.username}</p>
          <p>{player.totalPoint}</p>
        </div>
      );
    });
  }, [playerList]);

  const handleDrawerCard = useCallback(() => {
    Axios({
      url: `https://deckofcardsapi.com/api/deck/${deskCard.deck_id}/draw/?count=12`,
      method: "GET",
    })
      .then((res) => {
        console.log(res);
        dispatch({
          type: "DRAW_CARDS",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // Phải truyền 1 tham số vào, để hàm sẽ chạy lại mỗi khi tham số này thay đổi
  }, [deskCard, dispatch]);

  return (
    <div className="d-flex  justify-content-end container">
      <div className="border d-flex justify-content-center align-items-center px-2">
        <button className="btn btn-success mr-2">Shuffle</button>
        <button className="btn btn-info mr-2" onClick={handleDrawerCard}>
          Draw
        </button>
        <button className="btn btn-primary mr-2">Reveal</button>
      </div>
      <div className="d-flex">{renderPlayer}</div>
    </div>
  );
};

export default Control;
