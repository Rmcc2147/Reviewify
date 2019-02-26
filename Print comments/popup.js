let printReviews = document.getElementById("printReviewsButton");
let devButton = document.getElementById("devTest");

function toggleClasses(element, oldClass, newClass){
  element.classList.remove(oldClass);
  element.classList.add(newClass);
}

window.onload = function(){
  chrome.runtime.sendMessage({activeStatusRequest: "status_request"}, function(response){
    if(response.activeStatus == true){
      consoleLog("Extension state: Active");
      printReviews.textContent = "Active";
    }else if(response.activeStatus == false){
      consoleLog("Extension state: Inactive");
      toggleClasses(printReviews, "activeButton", "inactiveButton");
      printReviews.textContent = "Inactive";
    }
  });
}

printReviews.onclick = function(element) {
  if(printReviews.classList.contains("activeButton")){
    toggleClasses(printReviews, "activeButton", "inactiveButton");
    printReviews.textContent = "Inactive";
    chrome.runtime.sendMessage({activeStatusRequest: "disable"}, function(response){
      console.log("response received");
      console.log(response.activeStatusUpdate);
    });
  }
  else {
    toggleClasses(printReviews, "inactiveButton", "activeButton");
    printReviews.textContent = "Active";
    chrome.runtime.sendMessage({activeStatusRequest: "enable"}, function(response){
      console.log("response received");
      console.log(response.activeStatusUpdate);
    });
  }
  };

devButton.onclick = function(){
    chrome.storage.local.clear();
}
