"use strict";

class Scroller{

  constructor(keyword){
    this.index = 0;
    this.heldReviews = [];
    this.reviewHolder = document.createElement('div');
    this.category = keyword;
    this.element = this.createScroller();
  }

  createScroller() {
    let scroller = document.createElement('div');
    let scrollButton = document.createElement('div');
    let scrollButtonLeft = document.createElement('div');
    scrollButtonLeft.addEventListener('click', function(){
      this.scrollLeft();
    }.bind(this));
    let scrollButtonRight = document.createElement('div');
    scrollButtonRight.addEventListener('click', function(){
      this.scrollRight();
    }.bind(this));
    this.reviewHolder.classList.add('reviewHolder');
    scrollButton.classList.add('scrollButton');
    scrollButtonLeft.classList.add('scrollButtonLeft');
    scrollButtonRight.classList.add('scrollButtonRight');
    scrollButton.appendChild(scrollButtonLeft);
    scrollButton.appendChild(scrollButtonRight);

    scroller.id = "scrollerForWord_" + this.category;
    scroller.classList.add('reviewScroller');
    scroller.classList.add('nowHidden');
    scroller.appendChild(scrollButton);
    scroller.appendChild(this.reviewHolder);

    return scroller;
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

  appendScroller(parent) {
    parent.appendChild(this.element);
  }

  displayContent() {
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
    if(this.heldReviews.length == 1){
      this.displayContent();
    }
  }
}
