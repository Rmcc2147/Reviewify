"use strict";

class Category{

  constructor(keyword){
    this.index = 0;
    this.heldReviews = [];
    this.reviewWrapper = document.createElement('div');
    this.reviewHolder = document.createElement('div');
    this.category = keyword;
    this.scroller = this.createScroller();
    this.scrollButton;
    this.categoryButton = this.createCatBut();
    this.buttonReviewNum;
    this.ratingElem;
    this.currentDisplay;
    this.totalStars = 0;
  }

  createScroller() {
    let scroller = document.createElement('div');
    this.scrollButton = document.createElement('div');

    let displayWrapper = document.createElement("div");
    displayWrapper.classList.add("displayWrapper");
    let staticDisplay = document.createElement("span");
    staticDisplay.textContent = "Now showing ";
    this.currentDisplay = document.createElement("span");
    this.currentDisplay.classList.add("currentDisplay");
    this.currentDisplay.textContent = (this.index+1) + " of " + this.heldReviews.length;

    displayWrapper.appendChild(staticDisplay);
    displayWrapper.appendChild(this.currentDisplay);

    let scrollButtonLeft = buttonTemplate("Left");
    scrollButtonLeft.addEventListener('click', function(){
      this.scrollLeft();
    }.bind(this));
    let scrollButtonRight = buttonTemplate("Right");
    scrollButtonRight.addEventListener('click', function(){
      this.scrollRight();
    }.bind(this));
    this.reviewWrapper.classList.add('reviewWrapper');
    this.reviewHolder.classList.add('reviewHolder');
    this.scrollButton.classList.add('scrollButton');
    scrollButtonLeft.classList.add('scrollButtonLeft');
    scrollButtonRight.classList.add('scrollButtonRight');
    this.scrollButton.appendChild(scrollButtonLeft);
    this.scrollButton.appendChild(scrollButtonRight);

    scroller.id = "scrollerForWord_" + this.category;
    scroller.classList.add('reviewScroller');
    scroller.classList.add('nowHidden');
    this.reviewWrapper.appendChild(displayWrapper);
    this.reviewWrapper.appendChild(this.scrollButton);
    this.reviewWrapper.appendChild(this.reviewHolder);
    scroller.appendChild(this.reviewWrapper);
    return scroller;
  }

  createCatBut(){
    let commentIcon = document.createElement("div");
    commentIcon.classList.add('commentIcon');
    let categoryButton = buttonTemplate((this.category.charAt(0).toUpperCase() + this.category.slice(1)), commentIcon);
    categoryButton.id = "categoryButtonForWord_" + this.category;

    addTracker(categoryButton);
    addTracker(categoryButton);
    categoryButton.querySelectorAll(".trackerStatic")[0].textContent = "Instances found: ";
    this.buttonReviewNum = categoryButton.querySelectorAll(".trackerNon_static")[0];
    this.buttonReviewNum.textContent = "0";
    categoryButton.querySelectorAll(".trackerStatic")[1].textContent = "Average rating: ";
    this.ratingElem = categoryButton.querySelectorAll(".trackerNon_static")[1];
    this.ratingElem.textContent = "0";

    categoryButton.addEventListener("click", function(e){
      buttonListener(e.currentTarget, this.scroller)
    }.bind(this));

    return categoryButton;
  }

  getIndex (){
    return this.index;
  }

  setCategory(newIdentifier){
    this.category = newIdentifier;
  }

  setScrollerID(newID) {
    this.element.id = newID;
  }

  displayContent() {
    this.currentDisplay.textContent = (this.index+1) + " of " + this.heldReviews.length;

    let tempDiv = document.createElement('div');
    let currentReview = this.heldReviews[this.index];
    if(typeof currentReview === "string"){
      tempDiv.innerHTML = currentReview;
    }else{
      tempDiv.innerHTML = currentReview.innerHTML;
    }
    let text = tempDiv.querySelectorAll(".review-text")[0].outerHTML;
    tempDiv.querySelectorAll(".review-text")[0].outerHTML = "";
    this.reviewHolder.innerHTML = tempDiv.innerHTML + text;
  }

  scrollLeft(){
    if(this.heldReviews[this.index - 1]) {
      this.index -= 1;
      this.displayContent();
    }
  }

  scrollRight() {
    if(this.heldReviews[this.index + 1]) {
      this.index += 1;
      this.displayContent();
    }
  }

  addReview(review, stars) {
    this.currentDisplay.textContent = (this.index+1) + " of " + (this.heldReviews.length+1);
    this.heldReviews.push(review);
    this.totalStars += stars;
    this.buttonReviewNum.textContent = this.heldReviews.length;
    this.ratingElem.textContent = Math.round((this.totalStars/this.heldReviews.length)*10)/10;
    if(this.heldReviews.length == 1){
      this.displayContent();
    }
  }
}
