let active;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("Message received: " + request.activeStatusRequest);
    if(request.activeStatusRequest == "disable"){
      active = false;
      sendResponse({activeStatusUpdate: "disable"});
    }else if(request.activeStatusRequest == "enable"){
      active = true;
      sendResponse({activeStatusUpdate: "enable"});
    }else if(request.activeStatusRequest == "status_request"){
      sendResponse({activeStatus: active});
    }
});
