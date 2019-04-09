"use strict";

class SearchBar{
  constructor(obj){
    this.domLoader = obj;
    this.categoryObj = new Category("###search###");
    this.input;
    this.reviewBox = document.createElement('div');
    this.reviewBox.id = "reviewBox";
    this.scroller = this.createScroller();
    this.reviewBox.addEventListener("click", this.loadReviews.bind(this));
    this.base = this.createBase();
  }

  createBase(){
    let base = buttonTemplate("Search for a word...");
    base.id = "searchBar";
    this.input = document.createElement("input");
    this.input.id = "searchInput";
    base.querySelectorAll(".buttonInner")[0].appendChild(this.input);
    return base;
  }

  createScroller(){
    document.getElementById("searchHolder").appendChild(this.categoryObj.scroller);
    this.reviewBox.addEventListener("click", function(e){
      buttonListener(e.currentTarget.children[0], this.categoryObj.scroller)
    }.bind(this));
  }

  onChange(e){
    document.getElementById("reviewBox").innerHTML = "";
    let catHolder = this.dom.querySelectorAll("#categoryHolderInner")[0];
    let scrollHolder = this.dom.querySelectorAll("#scrollerHolder")[0];
    let val = e.currentTarget.value;
    this.reorderReviews();
    if(val && val != ""){
      let searchArr = [];

      for(let i = 0 ; i < this.catObjs.length ; i++){
        if(this.catObjs[i].category.includes(val)){
          searchArr.push(this.catObjs[i]);
        }
      }

      catHolder.innerHTML = "";
      scrollHolder.innerHTML = "";

      let str = "All reviews for '" + val + "'";
      let newButton = buttonTemplate(str);
      newButton.classList.add("newButton");
      document.getElementById("reviewBox").appendChild(newButton);



      for(let i = 0 ; i < 10 ; i++){
        if(searchArr[i]){
          catHolder.appendChild(searchArr[i].categoryButton);
          scrollHolder.appendChild(searchArr[i].scroller);
        }
      }
    }
  }

  loadReviews(e){
    let val = this.input.value;
    let reviewsToDisplay = [];
    for(let i = 0 ; i < this.domLoader.reviews.length ; i++){
      let review = this.domLoader.reviews[i];
      if(review.text.includes(val)){
        reviewsToDisplay.push(review.review);
      }
    }
    if(reviewsToDisplay.length != 0){
      this.categoryObj.heldReviews = reviewsToDisplay;
      this.categoryObj.displayContent();
    }
  }

}
