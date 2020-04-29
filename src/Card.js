import React, { useState } from 'react';
import './Card.css';

const Card = props => {
  const showCard = props.flipped || props.revealed;

  const cls = `card ${props.revealed ? ' revealed' : ''}`;

  return (
    <div className={cls} onClick={() => props.cardSelected(props.id)}>
      {showCard ? props.letter : '?'}
    </div>
  );
}

export default Card;
