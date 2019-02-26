let printReviews = document.getElementById("printReviewsButton");

function toggleClasses(element, oldClass, newClass){
  element.classList.remove(oldClass);
  element.classList.add(newClass);
}

window.onload = function(){
  chrome.runtime.sendMessage({activeStatusRequest: "status_request"}, function(response){
    if(response.activeStatus == true){
      printReviews.textContent = "Active";
    }else if(response.activeStatus == false){
      toggleClasses(printReviews, "activeButton", "inactiveButton");
      printReviews.textContent = "Inactive";
    }
  });
}

printReviews.addEventListener('mousedown', function(e){
  e.preventDefault();
}, false);

printReviews.onclick = function(event) {
  if(printReviews.classList.contains("activeButton")){
    toggleClasses(printReviews, "activeButton", "inactiveButton");
    printReviews.textContent = "Inactive";
    chrome.runtime.sendMessage({activeStatusRequest: "disable"}, function(response){
    });
  }
  else {
    toggleClasses(printReviews, "inactiveButton", "activeButton");
    printReviews.textContent = "Active";
    chrome.runtime.sendMessage({activeStatusRequest: "enable"}, function(response){
    });
  }
  };
