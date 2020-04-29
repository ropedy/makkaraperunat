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

  return cards.map(c => [Math.random(), c]).sort().map(c => c[1]);
}

const Board = () => {
  const [ cards, setCards ] = useState(createCards());
  const [ active, setActive ] = useState(true);
  const [ completed, setCompleted ] = useState(false);
  const [ tries, setTries ] = useState(0);

  const resetGame = () => {
    setCards(createCards());
    setActive(true);
    setCompleted(false);
    setTries(0);
  }

  const cardSelected = id => {
    const card = cards.find(c => c.id === id);
    const previous = cards.find(c => c.flipped);

    if (card.flipped || card.revealed || !active) {
      return;
    }

    let newCards = cards.map(c => c.id !== id ? c : { ...c, flipped: true });

    if (previous) {
      const match = previous.letter === card.letter;

      if (match) {
        newCards = newCards.map(c => ![previous.id, card.id].includes(c.id) ? c : { ...c, revealed: true, flipped: false });
      }
      else {
        setActive(false);

        setTimeout(() => {
          setCards(newCards.map(c => ({ ...c, flipped: false })));
  
          setActive(true);
        }, 1000);
      }

      setTries(tries + 1);
    }

    setCards(newCards);

    if (newCards.every(c => c.revealed)) {
      setCompleted(true);

      
      setTimeout(() => {
        resetGame();
      }, 1000);
    }
  }
  
  const cls = `board${active ? ' active' : ''}${completed ? ' completed' : ''}`;

  return (
    <>
      <div className={cls}>
        {cards.map(c => <Card key={c.id} {...c} cardSelected={cardSelected}></Card>)}
      </div>
      <div>Tries: {tries}</div>
    </>
  );
}

export default Board;
