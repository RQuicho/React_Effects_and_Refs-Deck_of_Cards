import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Card = () => {
  const [cardData, setCardData] = useState(null);
  // const [draw, setDraw] = useState('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
  const drawCard = 'https://deckofcardsapi.com/api/deck/new/draw/?count=1';
  useEffect(function loadDataWhenMounted() {
    async function loadData () {
      const res = await axios.get(drawCard);
      setCardData(res.data);
    }
    loadData();
  }, []);

  // async function loadData () {
  //   const res = await axios.get(drawCard);
  //   setCardData(res.data);
  //   console.log(cardData);
  // }
  // loadData();

  console.log(cardData);
  return (
    <div>
      {cardData ? <h1>Deck Id: {cardData.deck_id}</h1> : <h1>Loading...</h1>}
      {cardData ? <h1>Value: {cardData.cards[0].value}</h1> : <h1>Loading...</h1>}
      {cardData ? <h1>Suit: {cardData.cards[0].suit}</h1> : <h1>Loading...</h1>}
      {cardData ? <img src= {cardData.cards[0].image} /> : <h1>Loading...</h1>}


      {/* <p>Deck Id: {cardData}</p> */}
    </div>
  )
}

export default Card;