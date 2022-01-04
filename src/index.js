import './style.css';
import printMe from './print.js';

console.log("index.js working!");

function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
  btn.classList.add('hello');

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());
