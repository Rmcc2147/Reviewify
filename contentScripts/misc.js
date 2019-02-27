"use strict";

function consoleLog(to_be_logged){
  console.log("From Amazon Comment Rearranger Chrome Extension: \n" + to_be_logged);
}

function toggleClasses(elem, remove, add){
  elem.classList.remove(remove);
  elem.classList.add(add);
}
