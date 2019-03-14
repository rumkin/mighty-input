import React from 'react';
import MightyInput from 'mighty-input';

export default function AnimatedInput({ value, ...props }) {
  const render = nextValue => Array.from(nextValue)
  .map((char, i) => (
    <span key={i} className={`animation-${getCharType(char)}`}>
      {char}
    </span>
  ));

  return (
    <MightyInput value={value} render={render} {...props}/>
  );
}

function getCharType(char) {
  switch (char) {
    // Smily face emoji
    case "\ud83d\ude00":
      return "smiley";
    // Heart emoji
    case "\ud83d\udc97":
      return "heart";
    default:
      return "char";
  }
}
