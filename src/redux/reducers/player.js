let initialState = {
  playerList: [
    {
      username: "Player 1",
      totalPoint: 0,
      cards: [],
    },
    {
      username: "Player 2",
      totalPoint: 0,
      cards: [],
    },
    {
      username: "Player 3",
      totalPoint: 0,
      cards: [],
    },
    {
      username: "your name",
      totalPoint: 0,
      cards: [],
    },
  ],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_NAME":
      state.playerList[3].username = payload;
      return {...state};
    case "DRAW_CARDS":
      // Cách chia bài 
      // Vì react so sánh là shallow ( so sánh nông, spread operater chỉ copy được 1 cấp, nếu state là 1 mảng chứa trong object, sẽ phải clone 1 ra 1 mảng khác, chỉnh sửa rồi mới gán lại cho state)
      const cloneCard = {...state.playerList}
      for (let i in payload){
        const playerIndex = i % state.playerList.length;
        cloneCard[playerIndex].cards.push(payload[i])
      }
      state.cards = cloneCard;
      
      return {...state};
    default:
      return state;
  }
};

export default reducer;
