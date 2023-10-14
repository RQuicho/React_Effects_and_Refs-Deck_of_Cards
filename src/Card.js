import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Card = () => {
  const [cardData, setCardData] = useState(null);
  // const [draw, setDraw] = useState('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
  const drawCard = 'https://deckofcardsapi.com/api/deck/new/draw/?count=1';
  useEffect(() => {
    async function loadData () {
      const res = await axios.get(drawCard);
      setCardData(res);
    }
    loadData();
  }, []);

  return (
    <div>
      <p>{cardData}</p>
    </div>
  )
}

export default Card;