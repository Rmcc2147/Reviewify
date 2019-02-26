chrome.runtime.onInstalled.addListener(function() {
    console.log("Ready to print reviews.");
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
