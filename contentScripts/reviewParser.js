"use strict";

class ReviewParser{
  constructor(){
  }

  parseReviews(reviewArr){
    return reviewArr.map(function(review){
      return this.getReviewContent(review);
    }.bind(this));
  }

  getReviewContent(review){
    review.title = review.review.querySelectorAll(".review-title")[0].textContent;
    review.text = review.review.querySelectorAll(".review-text")[0].textContent;
    review.keywords = this.getKeywords(review.text);

    return review;
  }

  getKeywords(text){
    if(text.length == 0){
      return ['none'];
    }
    let regex = /[.,!?]/g;
    let keywords = text.replace(regex, ' ').removeStopWords().sortByKeyWords();
    return keywords;
  }
}
