"use strict";

function consoleLog(to_be_logged){
  console.log("From Amazon Comment Rearranger Chrome Extension: \n" + to_be_logged);
}

function toggleClasses(elem, remove, add){
  elem.classList.remove(remove);
  elem.classList.add(add);
}

function toggleClasses_all(elem, className){
  let allElems = document.getElementsByClassName(className);

  for (let i = 0; i < allElems.length; i++) {
    if(allElems[i] != elem){
      allElems[i].classList.remove(className);
    }
  }
  if(elem){
    (elem.classList.contains(className) == true) ? elem.classList.remove(className) : elem.classList.add(className)
  }
}

function buttonTemplate(str, node){
  let buttonOuter = document.createElement("div");
  let buttonInner = document.createElement("div");
  let buttonSpan = document.createElement("span");

  buttonOuter.classList.add('buttonOuter');
  buttonInner.classList.add('buttonInner');
  buttonSpan.classList.add('buttonSpan');
  buttonSpan.classList.add('noSelect');

  buttonSpan.textContent = str;

  buttonInner.appendChild(buttonSpan);
  if(node){
    buttonOuter.appendChild(node);
  }
  buttonOuter.appendChild(buttonInner);

  return buttonOuter;
}

function buttonListener(elem, scroller){
  let associated_scroller = scroller;
  let visibleElems = document.getElementsByClassName('nowVisible');
  let clickedElems = document.getElementsByClassName('buttonClicked');

  for(let i = 0 ; i < visibleElems.length ; i++){
    if(visibleElems[i] != associated_scroller){
      toggleClasses(visibleElems[i], 'nowVisible', 'nowHidden');
    }
  }

  toggleClasses_all(elem, "buttonClicked");

  if(associated_scroller.classList.contains('nowHidden')){
    toggleClasses(associated_scroller, 'nowHidden', 'nowVisible');
  }else{
    toggleClasses(associated_scroller, 'nowVisible', 'nowHidden');
  }
}

function unselectAll(){
  let visibleElems = document.getElementsByClassName('nowVisible');
  let clickedElems = document.getElementsByClassName('buttonClicked');

  for(let i = 0 ; i < visibleElems.length ; i++){
    toggleClasses(visibleElems[i], 'nowVisible', 'nowHidden');
  }
  for(let i = 0 ; i < clickedElems.length ; i++){
    clickedElems[i].classList.remove("buttonClicked")
  }
}

function addTracker(elem){
    const APPEND_HERE = elem.querySelectorAll(".buttonSpan")[0];
    const APPEND_ME = document.createElement("span");
    const STATIC = document.createElement("span");
    let non_static = document.createElement("span");

    APPEND_ME.classList.add("trackerWrapper");
    STATIC.classList.add("trackerStatic");
    non_static.classList.add("trackerNon_static");

    APPEND_ME.appendChild(STATIC);
    APPEND_ME.appendChild(non_static);

    APPEND_HERE.parentNode.insertBefore(APPEND_ME, APPEND_HERE.nextSibling);
}
