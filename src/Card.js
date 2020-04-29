import React, { useState } from 'react';
import './Card.css';

const Card = props => {
  const showCard = props.flipped || props.revealed;

  return (
    <div className='card' onClick={() => props.cardSelected(props.id)}>
      {showCard ? props.letter : '?'}
    </div>
  );
}

export default Card;
