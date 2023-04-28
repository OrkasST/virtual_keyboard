function create({element = 'div',className = '', id = '', content='', isInBody = true}) {
    console.group('Creating div element...');
    let newDiv = document.createElement(element);
    console.log('newDiv: ', newDiv);
    newDiv.className = className;
    newDiv.id = id;
    newDiv.innerText = content;
    if ( isInBody ) document.body.appendChild(newDiv);
    console.groupEnd();
    return newDiv;
}

function setRelation(parent, child) {
    if(typeof parent !== "object") throw new Error("Invalid parent element");
    if(typeof child !== "object") throw new Error("Invalid child element");
    parent.appendChild(child);
    console.group('Parenting...');
    console.log('child: ', child);
    console.log('parent: ', parent);
    console.groupEnd();
}

let lang = 'en';
const keys = {
    en: [
        ['~\n`', 'Backquote'],
        ['!\n1', 'Digit1']
    ],
    ru: []
};

const display = create({element: 'div', id: 'display'});
const keyboard = create({element: 'div', className:'keyboard', id: 'board'});
let elements = keys[lang].map(el => {
    let button = create({element: 'div', className:'keyboard-button', id: el[1], content: el[0], isInBody: false});
    setRelation(keyboard, button);
    return button;
});

document.addEventListener('keyup', (e) => console.log('e.code: ', e.code));
