import React from 'react';
import MightyInput from 'mighty-input';

export function AcceptInput({
  value,
  errorClassName = 'input-error',
  regexp = /./m,
  ...props
}) {
  const render = next => Array.from(next)
  .map((char, i) => {
    if (regexp.test(char)) {
      return char;
    }
    else {
      return (
        <span className={errorClassName} key={i}>
          {char}
        </span>
      );
    }
  });

  return <MightyInput value={value} render={render} {...props} />;
}
