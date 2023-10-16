import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Card = () => {
  const [cardData, setCardData] = useState(null);
  const [deckId, setDeckId] = useState(null);
  const drawFirstCard = 'https://deckofcardsapi.com/api/deck/new/draw/?count=1';

  useEffect(function loadDataWhenMounted() {
    try {
      async function loadData () {
        const res = await axios.get(drawFirstCard);
        setCardData(res.data);
        setDeckId(res.data.deck_id);
      }
      loadData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  console.log('cardData...', cardData);
  console.log('deckId...', deckId);

  const drawCardFromSameDeck = async () => {
    if (deckId) {
      const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
      setCardData(res.data);
    }
  }

  return (
    <div>
      {/* {cardData ? <h1>Deck Id: {cardData.deck_id}</h1> : <h1>Loading...</h1>} */}
      {/* {cardData ? <h1>Value: {cardData.cards[0].value}</h1> : <h1>Loading...</h1>}
      {cardData ? <h1>Suit: {cardData.cards[0].suit}</h1> : <h1>Loading...</h1>} */}
      {cardData ? <h1>Cards Remaining: {cardData.remaining}</h1> : <h1>Loading...</h1>}

      {cardData ? <img src= {cardData.cards[0].image} alt='Card'/> : <h1>Loading...</h1>}
      <button onClick={drawCardFromSameDeck}>Draw</button>

    </div>
  )
}

export default Card;