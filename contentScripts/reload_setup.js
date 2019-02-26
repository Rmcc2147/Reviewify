var storer = new StorageAccess(location.host + location.pathname);

chrome.runtime.sendMessage({activeStatusRequest: "status_request"}, function(response){
  if(response.activeStatus == true){
    consoleLog("Extension state: Active");
    init();
    //commentGrabSwitchboard();
  }else if(response.activeStatus == false){
    consoleLog("Extension state: Inactive");
  }
});

function IsAmazonFirstProductPage(elem){
  let urlPath = location.pathname;
  if(urlPath.includes("/dp/") || urlPath.includes("/gp/")){
    return true;
  }else{
    return false;
  }
}

async function init(){
  if(!IsAmazonFirstProductPage(document)){
    return console.log("Not an amazon product page.");
  }

  let domLoader = new DOMLoader();
  let reviewGrabber = new ReviewGrabber();
  let reviewParser = new ReviewParser();

  domLoader.loadDOM();

  while(reviewGrabber.url){
    let reviews = await reviewGrabber.getReviews();
    let reviewContent = reviewParser.parseReviews(reviews);
    domLoader.addReviews(reviews, reviewContent);
  }

}

async function commentGrabSwitchboard(){
  let loader = new DOMLoader();
  loader.loadDOM();
  let parsedReviews;// = await storer.getParsedReviews();
  let rawReviews = await storer.getRawReviews();

  if(IsAmazonFirstProductPage(document)){
    loadStartupDOM();
    if(!parsedReviews || !rawReviews){
      collectProductComments();
    }else{
      let JSONprevStored = JSON.parse(parsedReviews);
      contentArray = jsonToArray(JSONprevStored);
      reviewArray = JSON.parse(rawReviews);
      parseReviews(reviewArray, contentArray);
    }
  }
}

function jsonToArray(json_data){
  let arr = []
  for(let i = 0 ; i < json_data.length ; i++){
    arr.push(json_data[i]);
  }
  return arr;
}
