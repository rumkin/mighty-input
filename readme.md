# Mighty Input

Tiny React text input component for the modern web. Use HTML to decorate
`<input />` value for your goals.

<p align="center">
  <img width="720" alt="Mighty input example GIF" src="https://raw.githubusercontent.com/rumkin/mighty-input/HEAD/docs/mighty-input.gif" />
</p>

👇 Source from the gif 👆. CSS could be found in [examples](examples) folder.

```javascript
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

function getCharType(char, index) {
  switch (char) {
    case "\ud83d\ude00": // Smiley face emoji
      return "smiley";
    case "\ud83d\udc97": // Heart emoji
      return "heart";
    default:
      return "char";
  }
}
```


## Installation

```shell
npm i mighty-input
```

## Live examples

* [Message Input](https://mighty-input.now.sh/#message-input)
* [Highlight errors](https://mighty-input.now.sh/#highlight-errors)
* [Phone number input](https://mighty-input.now.sh/#phone-number)
* [Number groups](https://mighty-input.now.sh/#number-groups)
* [Fixed input value](https://mighty-input.now.sh/#fixed-input-value)

## Usage

Use `render` property to specify custom render method and receive changed via `onUpdate` property callback.
```js
<MightyInput
  render={(value) => (
    <span style={{borderBottom: '2px solid green'}}>
      {value}
    </span>
  )}}
  onUpdate={(value) => {
    // Value changed
  }}
/>
```

### Filter value

Use `filter` prop to specify input filter function.

Filtrate any non-digit values:
```js
<MightyInput
  filter={(next, prev) => {
    if (/^\d$/.test(next)) {
      return next;
    }
    else {
      return prev;
    }
  }}
/>
```

## API

### `render()`
```
(next:string, previous:string) -> string|React.Element
```

Render property is a function to transform value to HTML or another string. This function receives `next` and `previous` values of input field.

```javascript
<MightyInput render={
  (next) => <span style={{color: 'red'}}>{next}</span>
} />
```

### `filter()`
```
(next:string, previous:string) -> string
```

Filter property is a function to filtrate input and return new output value. This function receives `next` and `previous` values of input field.

```javascript
<MightyInput filter={
  (next, prev) => next.length < 10 ? next : prev
} />
```

### `onUpdate()`
```
(next:string, previous:string) -> void
```
Update event handler. It emits each time value (passed through `filter`) changes.

### `modifiers{}`
```
{
  focus:string = '--focus',
}
```

Modifers property is an object with CSS classes for different states. It's using to simulate native CSS behavior for input wrapper. Currently it only has one option: `focus`.

### References

MightyInput is inspired by [Colin Kuebler](https://github.com/kueblc)'s [LDT](https://github.com/kueblc/LDT).

## License

MIT © [Rumkin](https://rumk.in)
