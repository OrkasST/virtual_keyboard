import { keys } from "./keys.js";

function create({
  element = "div",
  className = "",
  id = "",
  content = "",
  isInBody = false,
}) {
  let newDiv = document.createElement(element);
  newDiv.className = className;
  newDiv.id = id;
  newDiv.innerText = content;
  if (isInBody) document.body.appendChild(newDiv);
  return newDiv;
}

function setRelation(parent, child) {
  parent.appendChild(child);
}

let cursorPosition = 0;
let typedText = "|";

function changeContent(element, newContent = "", option = "renew") {
  if (option === "erase") {
    if (typedText.length <= 1) return;
    typedText =
      typedText.substring(0, cursorPosition - 1) +
      typedText.substring(cursorPosition);
    cursorPosition--;
    element.innerText = typedText;
  } else if (option === "delete") {
    if (typedText.length <= 1 || cursorPosition === typedText.length-1) return;
    typedText =
      typedText.substring(0, cursorPosition + 1) +
      typedText.substring(cursorPosition + 2);
    // cursorPosition--;
    element.innerText = typedText;
  } else if (option === "add") {
    if (element.id === "display") {
      typedText =
        typedText.substring(0, cursorPosition) +
        newContent +
        typedText.substring(cursorPosition);
      cursorPosition++;
      element.innerHTML = typedText;
    } else element.innerText += newContent;
  } else element.innerText = newContent;
}

let lang = "en";
let isShiftPressed = false;
let isCaps = false;

const display = create({
  element: "div",
  id: "display",
  isInBody: true,
  //   content: "|",
});
const keyboard = create({
  element: "div",
  className: "keyboard",
  id: "board",
  isInBody: true,
});

let elements = keys[lang].map((el) => {
  let button = create({
    element: "div",
    className: "keyboard-button" + (el[2] ? " " + el[2] : ""),
    id: el[1],
  });
  if (el[0].indexOf(" ") >= 0) {
    el[0].split(" ").forEach((el, i) => {
      setRelation(
        button,
        create({
          element: "span",
          className: i === 0 ? "upper-symbol" : "lower-symbol",
          content: el,
        })
      );
    });
    button.classList.add("multi-symbol");
  } else changeContent(button, el[0]);
  setRelation(keyboard, button);
  button.addEventListener("mousedown", (e) => buttonDown(e));
  button.addEventListener("mouseup", (e) => buttonUp(e));
  return button;
});

function buttonDown(e) {
  let element = e.code ? document.getElementById(e.code) : e.target;
  element.classList.add("_pressed");
  if (element.id === "ShiftLeft" || element.id === "ShiftRight") {
    isShiftPressed = isCaps ? !isShiftPressed : true;
    console.log("isShiftPressed: ", isShiftPressed);
    return;
  }
  if (element.id === "Space") {
    changeContent(display, " ", "add");
    return;
  }
  if (element.id === "Backspace") {
    changeContent(display, "", "erase");
    return;
  }
  if (element.id === "Delete") {
    changeContent(display, "", "delete");
    return;
  }
  if (element.id.substring(0, 5) === "Arrow") {
    console.log(element.id.substring(5));
    moveCursor(element.id.substring(5));
    return;
  }
  if (element.classList.contains("_func")) return;
  let text = element.classList.contains("multi-symbol")
    ? isShiftPressed
      ? element.firstChild.innerText
      : element.lastChild.innerText
    : isShiftPressed
    ? element.innerText
    : element.innerText.toLowerCase();
  changeContent(display, text, "add");
}
function buttonUp(e) {
  let element = e.code ? document.getElementById(e.code) : e.target;
  element.classList.remove("_pressed");
  if (element.id === "ShiftLeft" || element.id === "ShiftRight")
    isShiftPressed = isCaps ? !isShiftPressed : false;
  if (element.id === "CapsLock") {
    isCaps = !isCaps;
    isShiftPressed = !isShiftPressed;
  }
}

function moveCursor(direction) {
  switch (direction) {
    case "Left":
      if (cursorPosition === 0) return;
      typedText =
        typedText.substring(0, cursorPosition - 1) +
        "|" +
        typedText.substring(cursorPosition - 1, cursorPosition) +
        typedText.substring(cursorPosition + 1);
      cursorPosition--;
      display.innerText = typedText;
      break;
    case "Right":
      if (cursorPosition === typedText.length - 1) return;
      typedText =
        typedText.substring(0, cursorPosition) +
        typedText.substring(cursorPosition + 1, cursorPosition + 2) +
        "|" +
        typedText.substring(cursorPosition + 2);
      cursorPosition++;
      display.innerText = typedText;
      break;
    case "Up":
      if (cursorPosition === 0) return;
      typedText =
        "|" +
        typedText.substring(0, cursorPosition) +
        typedText.substring(cursorPosition + 1);
      cursorPosition = 0;
      display.innerText = typedText;
      break;
    case "Down":
      if (cursorPosition === typedText.length - 1) return;
      typedText =
        typedText.substring(0, cursorPosition) +
        typedText.substring(cursorPosition + 1) +
        "|";
      cursorPosition = typedText.length - 1;
      display.innerText = typedText;
      break;
    default:
      break;
  }
}

document.addEventListener("keydown", (e) => buttonDown(e));
document.addEventListener("keyup", (e) => buttonUp(e));
