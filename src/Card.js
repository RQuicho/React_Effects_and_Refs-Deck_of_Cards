import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Card = () => {
  const [cardData, setCardData] = useState(null);
  const [deckId, setDeckId] = useState(null);
  const [remainingCards, setRemainingCards] = useState(null);
  const [isShuffled, setIsShuffled] = useState(false);
  const drawFirstCard = 'https://deckofcardsapi.com/api/deck/new/draw/?count=1';

  useEffect(function loadDataWhenMounted() {
    try {
      async function loadData () {
        const res = await axios.get(drawFirstCard);
        setCardData(res.data);
        setDeckId(res.data.deck_id);
        setRemainingCards(res.data.remaining);
      }
      loadData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  console.log('cardData...', cardData);
  console.log('deckId...', deckId);
  console.log('remainingCards...', remainingCards);

  const drawCardFromSameDeck = async () => {
    if (deckId) {
      try {
        const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        setIsShuffled(false);
        setCardData(res.data);
        setRemainingCards(res.data.remaining);
      } catch(err) {
        console.log(err);
      }
    }
  }

  const shuffleSameDeck = async () => {
    if (deckId) {
      try {
        const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
        setRemainingCards(53);
        setIsShuffled(res.data.success);
      } catch(err) {
        console.log(err);
      }
    }
  }

  return (
    <div>
      {remainingCards === 0 ? alert("Error: no cards remaining!") : null}

      {cardData && !isShuffled ? <img src= {cardData.cards[0].image} alt='Card'/> : <h1>Draw a Card</h1>}
      <button onClick={drawCardFromSameDeck}>Draw</button>
      <button onClick={shuffleSameDeck}>Shuffle</button>

    </div>
  )
}

export default Card;