"use strict";

function consoleLog(to_be_logged){
  console.log("From Amazon Comment Rearranger Chrome Extension: \n" + to_be_logged);
}

function toggleClasses(elem, remove, add){
  elem.classList.remove(remove);
  elem.classList.add(add);
}

function buttonTemplate(str, node){
  let buttonOuter = document.createElement("div");
  let buttonInner = document.createElement("div");
  let buttonSpan = document.createElement("span");

  buttonOuter.classList.add('buttonOuter');
  buttonInner.classList.add('buttonInner');
  buttonSpan.classList.add('buttonSpan');
  //buttonSpan.classList.add('noSelect');

  buttonSpan.textContent = str;

  buttonInner.appendChild(buttonSpan);
  if(node){
    buttonOuter.appendChild(node);
  }
  buttonOuter.appendChild(buttonInner);

  return buttonOuter;
}
