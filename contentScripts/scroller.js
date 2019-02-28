"use strict";

class Scroller{

  constructor(keyword){
    this.index = 0;
    this.heldReviews = [];
    this.reviewHolder = document.createElement('div');
    this.category = keyword;
    this.element = this.createScroller();
    this.scrollButton;
  }

  createScroller() {
    let scroller = document.createElement('div');
    this.scrollButton = document.createElement('div');

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
    this.reviewHolder.appendChild(this.scrollButton);
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
    if(this.heldReviews.length == 1){
      this.displayContent();
    }
  }
}
