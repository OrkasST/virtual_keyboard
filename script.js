function div({className = '', id = '', content=''}) {
    console.group('Creating div element...');
    let newDiv = document.createElement('div');
    console.log('newDiv: ', newDiv);
    newDiv.classList.add(className);
    newDiv.id = id;
    newDiv.innerText = content;
    document.body.appendChild(newDiv);
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
    en: ['~\n`', 1,2,3,4,5,6,7,8,9,0,'_\n-', '+\n='],
    ru: []
};

const display = div({id: 'display'});
const keyboard = div({className:'keyboard', id: 'board'});
let elements = keys[lang].map(el => {
    let button = div({className:'keyboardButton', id: 'I', content: el});
    setRelation(keyboard, button);
    return button;
});