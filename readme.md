# Mighty Input

Tiny React text input component for the modern web. Use HTML to decorate
`<input />` value for your goals.

<center>
  <img src="./docs/mighty-input.png" />
</center>

## Installation

```shell
npm i mighty-input
```

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

## License

MIT © [Rumkin](https://rumk.in)
