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
const keys = {
    en: [
        ['~ `', 'Backquote'],
        ['! 1', 'Digit1'],
        ['@ 2', 'Digit2'],
        ['# 3', 'Digit3'],
        ['$ 4', 'Digit4'],
        ['% 5', 'Digit5'],
        ['^ 6', 'Digit6'],
        ['& 7', 'Digit7'],
        ['* 8', 'Digit8'],
        ['( 9', 'Digit9'],
        [') 0', 'Digit0'],
        ['_ -', 'Minus'],
        ['+ =', 'Equal'],
        ['Backspace', 'Backspace'],
        ['Tab', 'Tab'],
        ['Q', 'KeyQ'],
        ['W', 'KeyW'],
        ['E', 'KeyE'],
        ['R', 'KeyR'],
        ['T', 'KeyT'],
        ['Y', 'KeyY'],
        ['U', 'KeyU'],
        ['I', 'KeyI'],
        ['O', 'KeyO'],
        ['P', 'KeyP'],
        ['{ [', 'BracketLeft'],
        ['} ]', 'BracketRight'],
        ['| \\', 'Backslash'],
        ['Del', 'Delete'],
        ['Caps\tLock', 'CapsLock'],
        ['A', 'KeyA'],
        ['S', 'KeyS'],
        ['D', 'KeyD'],
        ['F', 'KeyF'],
        ['G', 'KeyG'],
        ['H', 'KeyH'],
        ['J', 'KeyJ'],
        ['K', 'KeyK'],
        ['L', 'KeyL'],
        [': ;', 'Semicolon'],
        ['" \'', 'Quote'],
        ['Enter', 'Enter'],
        ['Shift', 'ShiftLeft'],
        ['Z', 'KeyZ'],
        ['X', 'KeyX'],
        ['C', 'KeyC'],
        ['V', 'KeyV'],
        ['B', 'KeyB'],
        ['N', 'KeyN'],
        ['M', 'KeyM'],
        ['< ,', 'Comma'],
        ['> .', 'Period'],
        ['? /', 'Slash'],
        ['Up', 'ArrowUp'],
        ['Shift', 'ShiftRight'],
    ],
    ru: []
};

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
