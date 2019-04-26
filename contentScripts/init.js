"use strict";

chrome.runtime.sendMessage({activeStatusRequest: "status_request"}, function(response){//get system state from background script
  if(response.activeStatus == true){
    console.log("Extension state: Active");
    init();
  }else if(response.activeStatus == false){
    console.log("Extension state: Inactive");
  }
});

function IsAmazonFirstProductPage(elem){
  let urlPath = location.pathname;
  if((!urlPath.includes("/dp/") && !urlPath.includes("/gp/")) || document.getElementsByClassName("a-link-emphasis")[0] == null){
    return false;
  }else{
    return true;
  }
}

async function init(){

  if(!IsAmazonFirstProductPage(document)){//validate page
    return console.log("No reviews to be found.");
  }

  const STORER = new StorageAccess(location.host + location.pathname);
  let storedData = await STORER.getDataFromStorage();
  let domLoader = new DOMLoader();

  domLoader.loadDOM();//static UI setup

  switch(storedData){
    case(undefined)://there is no associated content in local storage

      const REVIEW_PARSER = new ReviewParser();
      let reviewGrabber = new ReviewGrabber();
      let allReviews = {
        "reviews": []
      };

      domLoader.createLoadingBar();

      while(reviewGrabber.url){//this loop iterates over all review pages for an Amazon product. Stops when all pages have been visited.
        let reviews = await reviewGrabber.getReviews();
        let reviewContent = REVIEW_PARSER.parseReviews(reviews);

        for (let i = 0; i < reviewContent.length; i++) {
          allReviews.reviews.push(reviewContent[i]);
        }
        domLoader.addReviews(reviewContent);//add reviews to UI
        domLoader.reorderCategories();//reorder categories so the ones holding the most reviews are displayed on top
        domLoader.loadingBar.incrementProgress();//increment loading bar percentage
      }

      STORER.setReviews(allReviews);//store reviews in local storage
      break;

    default://reviews found in local storage
      domLoader.addReviews(storedData.reviews);//add reviews to UI
      domLoader.reorderCategories();
  }

}
