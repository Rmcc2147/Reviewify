"use strict";

class Category{

  constructor(keyword){
    this.index = 0;
    this.heldReviews = [];
    this.reviewHolder = document.createElement('div');
    this.category = keyword;
    this.scroller = this.createScroller();
    this.scrollButton;
    this.categoryButton = this.createCatBut();
    this.buttonReviewNum;
    this.currentDisplay;
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
    this.currentDisplay.textContent = this.index + " of " + this.heldReviews.length;

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
    this.reviewHolder.classList.add('reviewHolder');
    this.scrollButton.classList.add('scrollButton');
    scrollButtonLeft.classList.add('scrollButtonLeft');
    scrollButtonRight.classList.add('scrollButtonRight');
    this.scrollButton.appendChild(scrollButtonLeft);
    this.scrollButton.appendChild(scrollButtonRight);

    scroller.id = "scrollerForWord_" + this.category;
    scroller.classList.add('reviewScroller');
    scroller.classList.add('nowHidden');
    console.log(displayWrapper);
    this.reviewHolder.appendChild(displayWrapper);
    //this.reviewHolder.appendChild(this.scrollButton);
    scroller.appendChild(this.reviewHolder);
    console.log(scroller);
    return scroller;
  }

  createCatBut(){
    let commentIcon = document.createElement("div");
    commentIcon.classList.add('commentIcon');
    let categoryButton = buttonTemplate((this.category.charAt(0).toUpperCase() + this.category.slice(1)), commentIcon);
    categoryButton.id = "categoryButtonForWord_" + this.category;

    addTracker(categoryButton);
    categoryButton.querySelectorAll(".trackerStatic")[0].textContent = "Instances found: ";
    this.buttonReviewNum = categoryButton.querySelectorAll(".trackerNon_static")[0];
    this.buttonReviewNum.textContent = "0";

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
    this.currentDisplay.textContent = this.index + " of " + this.heldReviews.length;

    let tempDiv = document.createElement('div');
    let currentReview = this.heldReviews[this.index];
    if(typeof currentReview === "string"){
      tempDiv.innerHTML = this.heldReviews[this.index];
    }else{
      tempDiv.innerHTML = this.heldReviews[this.index].innerHTML;
    }
    let text = tempDiv.querySelectorAll(".review-text")[0].outerHTML;
    tempDiv.querySelectorAll(".review-text")[0].outerHTML = "";
    this.reviewHolder.innerHTML = tempDiv.innerHTML + text;
    this.reviewHolder.firstChild.style.marginTop = "40px";
    this.reviewHolder.insertBefore(this.scrollButton, this.reviewHolder.firstChild);
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

  addReview(review) {
    this.heldReviews.push(review);
    this.buttonReviewNum.textContent = this.heldReviews.length;
    if(this.heldReviews.length == 1){
      this.displayContent();
    }
  }
}
