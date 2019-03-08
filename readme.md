# Mighty Input

Tiny React text input component for the modern web. Use HTML to decorate
`<input />` value for your goals.

<p align="center">
  <img width="420" src="https://raw.githubusercontent.com/rumkin/mighty-input/HEAD/docs/mighty-input.png" />
</p>

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
