import React, { Component } from "react";

const styles = {};

styles.wrapper = {
  display: "inline-block",
  boxSizing: "border-box",
  maxWidth: "100%",
  minWidth: "100px",
  overflow: "hidden",
  textAlign: "left",
  verticalAlign: "bottom",
};

styles.wrapperDefault = {
  ...styles.wrapper,
  border: "1px solid #ccc",
  backgroundColor: "white",
};

styles.innerWrapper = {
  display: "inline-block",
  overflowX: "scroll",
  overflowY: "hidden",
  position: "relative",
  width: "100%",
};

// Common style fro input and placeholder
const inputCommon = {
  fontSize: "16px",
  fontFamily: "sans-serif",
  boxSizing: "border-box",
  borderWidth: "0",
  // Stretch to fill wrapper
  minWidth: "100%",
  margin: "0",
};

styles.input = {
  ...inputCommon,
  position: "relative",
  zIndex: 1,
  padding: "5px 6px",

  outline: "none",
  caretColor: "black",

  // Make transparent background and font to make placeholder visible
  lineHeight: "22px",
  backgroundColor: "transparent",
  color: "rgba(0,0,0,0)",
};

styles.stub = {
  display: "block",
  position: "fixed",
  left: "-10000px",
  opacity: 0,
  whiteSpace: "pre",
};

styles.placeholder = {
  ...inputCommon,
  padding: "6px",
  lineHeight: "22px",
  // Make movable
  position: "absolute",
  // Move below input
  zIndex: 0,
  top: 0,
  left: 0,
  display: "block",
  // Turn off double scrolling.
  overflow: "hidden",
  // Set whitespace wrapping the same as input has.
  whiteSpace: "pre",
};

const scrollbar = getScrollbarSize();

// Input Data is using to allow filter and update functions be always optimized
class InputData {
  constructor(inputType, data, selectionStart, selectionEnd) {
    this.inputType = inputType;
    this.data = data;
    this.selectionStart = selectionStart;
    this.selectionEnd =
      selectionEnd === undefined ? selectionStart : selectionEnd;
  }
}

export default class MightyInput extends Component {
  static defaultProps = {
    filter: v => v,
    render: v => v,
    onChange: () => {},
    onUpdate: () => {},
    modifiers: {
      focus: "--focus",
    },
  };

  state = {
    value: "",
    focus: false,
    input: new InputData(),
  };

  wrapperRef = React.createRef();
  inWrapperRef = React.createRef();
  placeholderRef = React.createRef();
  inputRef = React.createRef();
  stubRef = React.createRef();

  get wrapperEl() {
    return this.wrapperRef.current;
  }

  get inWrapperEl() {
    return this.inWrapperRef.current;
  }

  get inputEl() {
    return this.inputRef.current;
  }

  get placeholderEl() {
    return this.placeholderRef.current;
  }

  get stubEl() {
    return this.stubRef.current;
  }

  componentWillMount() {
    this.setState({ value: this.props.value || "" });
  }

  shouldComponentUpdate(props, state) {
    if (
      props.value === this.state.value &&
      state.focus === this.state.focus &&
      this.props.render === props.render &&
      this.props.filter === props.filter &&
      this.props.onUpdate === props.onUpdate &&
      this.props.onChange === props.onChange &&
      this.props.modifiers === props.modifiers
    ) {
      return false;
    }

    this.setState({
      value: props.value,
    });
    return true;
  }

  componentDidMount() {
    const { stubEl, inputEl, placeholderEl, wrapperEl, inWrapperEl } = this;
    const style = window.getComputedStyle(this.inputEl);

    stubEl.style.paddingTop = style.paddingTop;
    stubEl.style.paddingBottom = style.paddingBottom;
    stubEl.style.paddingRight = style.paddingRight;
    stubEl.style.paddingLeft = style.paddingLeft;
    stubEl.style.border = style.border;
    stubEl.style.fontFamily = style.fontFamily;
    stubEl.style.fontSize = style.fontSize;
    // Resize wrapper and inner wrapper to hide scrollbars
    wrapperEl.style.height = placeholderEl.offsetHeight + "px";
    inWrapperEl.style.height =
      inputEl.offsetHeight + (scrollbar.height || 20) + "px";
    inputEl.addEventListener("beforeinput", e => {
      this.setState({
        input: new InputData(
          e.inputType,
          e.data,
          inputEl.selectionStart,
          inputEl.selectionend,
        ),
      });
    });
    this.updateWidth();
  }

  setFocus(flag = true) {
    if (this.state.focus === flag) {
      return;
    }

    this.setState({
      focus: flag,
    });
  }

  onInput(e) {
    const { value, input } = this.state;
    const filter = this.props.filter;

    const newValue = filter(e.target.value, value, input);

    this.setState({
      value: newValue,
      input: new InputData(),
    });
    this.updateWidth();

    if (value !== newValue) {
      this.props.onUpdate(newValue, value, input);
    }
  }

  updateWidth() {
    this.stubEl.textContent = this.state.value;
    this.placeholderEl.style.width = this.inputEl.style.width =
      2 + this.stubEl.offsetWidth + "px";
  }

  render() {
    const {
      render,
      filter,
      className,
      onUpdate,
      onChange,
      style,
      modifiers,
      ...props
    } = this.props;
    const { value, focus } = this.state;
    const classes = [];
    let wrapperStyle;

    if (className) {
      classes.push(className);
      wrapperStyle = styles.wrapper;
    } else {
      wrapperStyle = styles.wrapperDefault;
    }

    if (focus) {
      classes.push(modifiers.focus);
    }

    return (
      <span
        ref={this.wrapperRef}
        className={classes.join(" ")}
        style={wrapperStyle}
      >
        <span ref={this.inWrapperRef} style={styles.innerWrapper}>
          <input
            onChange={onChange}
            {...props}
            style={styles.input}
            ref={this.inputRef}
            onInput={e => this.onInput(e)}
            onFocus={() => {
              this.setFocus(true);
            }}
            onBlur={() => {
              this.setFocus(false);
            }}
            value={value}
          />
          <span
            aria-hidden
            style={styles.placeholder}
            ref={this.placeholderRef}
          >
            {render(value) || "\u200B"}
          </span>
          <span aria-hidden ref={this.stubRef} style={styles.stub} />
        </span>
      </span>
    );
  }
}

function getScrollbarSize() {
  const root = document.createElement("div");
  root.style.position = "absolute";
  root.style.top = "-100px";

  const outer = document.createElement("div");
  outer.style.position = "relative";
  outer.style.width = "100px";
  outer.style.height = "100px";
  outer.style.overflow = "scroll";

  const inner = document.createElement("div");
  inner.style.position = "absolute";
  inner.style.top = "0px";
  inner.style.bottom = "0px";
  inner.style.right = "0px";
  inner.style.left = "0px";

  outer.appendChild(inner);
  root.appendChild(outer);
  document.body.appendChild(root);

  const width = outer.offsetWidth - inner.offsetWidth;
  const height = outer.offsetHeight - inner.offsetHeight;
  document.body.removeChild(root);

  return { width, height };
}
