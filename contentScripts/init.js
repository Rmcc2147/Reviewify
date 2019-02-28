"use strict";

chrome.runtime.sendMessage({activeStatusRequest: "status_request"}, function(response){
  if(response.activeStatus == true){
    console.log("Extension state: Active");
    init();
  }else if(response.activeStatus == false){
    console.log("Extension state: Inactive");
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

  const STORER = new StorageAccess(location.host + location.pathname);
  let storedData = await STORER.getDataFromStorage();
  let domLoader = new DOMLoader();

  domLoader.loadDOM();

  switch(storedData){
    case(undefined):

      const REVIEW_PARSER = new ReviewParser();
      let reviewGrabber = new ReviewGrabber();
      let allReviews = {
        "reviews": []
      };

      domLoader.createLoadingBar();

      while(reviewGrabber.url){
        let reviews = await reviewGrabber.getReviews();
        let reviewContent = REVIEW_PARSER.parseReviews(reviews);

        for (let i = 0; i < reviewContent.length; i++) {
          allReviews.reviews.push(reviewContent[i]);
        }

        domLoader.addReviews(reviewContent);
      }

      STORER.setReviews(allReviews);
      break;

    default:
      domLoader.addReviews(storedData.reviews);
  }

}
