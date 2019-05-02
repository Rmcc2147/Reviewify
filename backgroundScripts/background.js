let active;

chrome.runtime.onInstalled.addListener(function() {
    active = true;
    console.log("Extension ready.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'www.amazon.co.uk'}
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'www.amazon.com'}
          }),
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("Message received: " + request.activeStatusRequest);
    if(request.activeStatusRequest == "disable"){
      active = false;
      sendResponse({activeStatusUpdate: "disable"});
    }
    else if(request.activeStatusRequest == "enable"){
      active = true;
      sendResponse({activeStatusUpdate: "enable"});
    }
    else if(request.activeStatusRequest == "status_request"){
      sendResponse({activeStatus: active});
    }
});
