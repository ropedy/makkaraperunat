import React, { useState } from 'react';

import Card from './Card';

import './Board.css';

const createCards = () => {
  const cards = [];

  for (let i = 0; i < 16; i++) {
    cards.push({
      id: i,
      letter: String.fromCharCode(65 + Math.floor(i / 2)),
      flipped: false,
      revealed: false
    });
  }

  return cards;
}

const Board = () => {
  const [ cards, setCards ] = useState(createCards());

  const cardSelected = id => {
    console.log(id);
  }
  
  return (
    <div className='board'>
      {cards.map(c => <Card {...c} cardSelected={cardSelected}></Card>)}
    </div>
  );
}

export default Board;
