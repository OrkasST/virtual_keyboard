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
  if (typeof parent !== "object")
    throw new Error("Failed to set relation: Invalid parent element");
  if (typeof child !== "object")
    throw new Error("Failed to set relation: Invalid child element");
  parent.appendChild(child);
}

let cursorPosition = 0;
let typedText = "|";

function changeContent(element, newContent = "", option = "renew") {
  if (typeof element !== "object")
    throw new Error("Failed to change content: Invalid element");
  if (option === "erase") {
    if (element.innerText.length <= 1) return;
    // console.log(" element.innerText.length: ", element.innerText.length);

    if (element.id === "display") {
      typedText = typedText.substring(0, typedText.length - 2) + "|";
      cursorPosition--;
      element.innerText = typedText;
    } else
      element.innerText = element.innerText.substring(
        0,
        element.innerText.length - 1
      );
      // typedText
      // console.log('typedText: ', typedText);
      // console.log("~~~~~~~element.innerText.length: ", element.innerText.length);
  } else if (option === "add") {
    if (element.id === "display") {
      typedText =
        typedText.substring(0, cursorPosition) +
        typedText.substring(cursorPosition + 1);
      newContent += "|";
      cursorPosition++;
      // console.log("cursorPosition: ", cursorPosition);
      typedText += newContent;
      element.innerText = typedText;
      // console.log("typedText: ", typedText);
      // console.log("~~~typedText.length: ", typedText.length);
      // console.log("element.innerText: ", element.innerText);
      // console.log("~~~element.innerText.length: ", element.innerText.length);
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
    className: "keyboard-button" + (el[2] ? (' ' + el[2]) : ''),
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
  return button;
});

document.addEventListener("keydown", (e) => {
  let element = document.getElementById(e.code);
  element.classList.add("_pressed");
  if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
    isShiftPressed = isCaps ? !isShiftPressed : true;
    console.log('isShiftPressed: ', isShiftPressed);
    return;
  }
  if (e.code === "Space") {
    changeContent(display, " ", "add");
    return;
  }
  if (e.code === "Backspace") {
    changeContent(display, "", "erase");
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
});
document.addEventListener("keyup", (e) => {
  let element = document.getElementById(e.code);
  element.classList.remove("_pressed");
  if (e.code === "ShiftLeft" || e.code === "ShiftRight") isShiftPressed = isCaps ? !isShiftPressed : false;
  if (e.code === "CapsLock") {
    isCaps = !isCaps;
    isShiftPressed = !isShiftPressed;
  };
});
