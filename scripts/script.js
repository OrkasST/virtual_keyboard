import { keys } from "./keys.js";

function create({element = 'div',className = '', id = '', content='', isInBody = false}) {
    let newDiv = document.createElement(element);
    newDiv.className = className;
    newDiv.id = id;
    newDiv.innerText = content;
    if ( isInBody ) document.body.appendChild(newDiv);
    return newDiv;
}

function setRelation(parent, child) {
    if(typeof parent !== "object") throw new Error("Failed to set relation: Invalid parent element");
    if(typeof child !== "object") throw new Error("Failed to set relation: Invalid child element");
    parent.appendChild(child);
}

function changeContent (element, newContent = '') {
    if(typeof element !== "object") throw new Error("Failed to change content: Invalid element");
    element.innerText = newContent;
}

let lang = 'en';


const display = create({element: 'div', id: 'display', isInBody: true});
const keyboard = create({element: 'div', className:'keyboard', id: 'board', isInBody: true});
let elements = keys[lang].map(el => {
    let button = create({element: 'div', className:'keyboard-button', id: el[1]});
    if (el[0].indexOf(' ') >= 0) {
        el[0].split(' ').forEach((el, i) => {
            setRelation(button, create({element: 'span', className: i === 0 ? 'upper-symbol' : 'lower-symbol', content: el}));
        });
        button.classList.add('multi-symbol');
    }
    else changeContent(button, el[0]);
    setRelation(keyboard, button);
    return button;
});

document.addEventListener('keyup', (e) => console.log('e.code: ', e.code));
