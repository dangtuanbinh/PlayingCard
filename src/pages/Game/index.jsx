import React, { Fragment } from "react";
import "./index.css";
import Controls from "../../components/Control";
import Main from "../../components/Main";
// Hàm memo dùng để ngăn trang web thay đổi, chỉ thay đổi khi cần thiết
import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import Axios from "axios";

const Game = () => {
  const dispatch = useDispatch();
  // useEffect tahy thế componentDidMount, didUpdate, willUnmount. Trong component có thể có nhiều useEffect
  // Truyền vào 1 dependancy. Nếu là mảng rỗng, sẽ đóng vai trò là didMount, chỉ chạy 1 lần duy nhất. Còn nếu truyền vào 1 biến, thì sẽ là didUpdate, và chỉ khi nào biến truyền vào (là 1 state) thay đổi thì mới chạy.
  //  Khi ko truyền tham số, nhưng bên trong useEffect return 1 function, thì sẽ đóng vai trò là willUnmount
  useEffect(() => {
    Axios({
      url: "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
      method: "GET",
    })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: "SET_CARD",
          payload: res.data,
        })
      })
        // cách gọi "then" liên tiếp nhau, tuần tự là promise chaining. Promise.all([axios1,axios2]) sẽ gọi axios và chờ từng cái hoàn thành.
      //   return Axios({
      //     url: `https://deckofcardsapi.com/api/deck/${res.dta.desk_id}/draw/?count=12`,
      //     method: "GET"
      //     // "cardRes" là kết quả trả về link API trên
      //   }).then((cardRes) => {
      //     console.log(cardRes);
      //   })
      // })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);
  
  return (
    <>
      <Fragment>
        <Controls />
        <Main />
      </Fragment>
    </>
  );
};

export default memo(Game);
