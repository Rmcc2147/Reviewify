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
    //base = the whole button
    let base = buttonTemplate("Search for a word...");
    base.id = "searchBar";
    //input = user input bar
    this.input = document.createElement("input");
    this.input.setAttribute("autocomplete", "off");
    this.input.id = "searchInput";
    //clear = button to clear input
    let clear = document.createElement("button");
    clear.textContent = "Clear";
    clear.id = "clearInputButton";
    //function to clear the input when 'clear' is clicked
    clear.addEventListener("click", function(e){
      //clear the input
      this.input.value = "";
      //create and dispatch a fake event to trigger the onChange(e) function that handles input changes
      let fake_event = document.createEvent("Event");
      fake_event.initEvent("change", false, true);
      this.input.dispatchEvent(fake_event);
    }.bind(this));
    base.querySelectorAll(".buttonInner")[0].appendChild(this.input);
    base.querySelectorAll(".buttonInner")[0].appendChild(clear);
    return base;
  }

  createScroller(){
    document.getElementById("searchHolder").appendChild(this.categoryObj.scroller);
    this.reviewBox.addEventListener("click", function(e){
      buttonListener(e.currentTarget.children[0], this.categoryObj.scroller)
    }.bind(this));
  }


  //this functions context is binded to domLoader
  onChange(e){
    document.getElementById("reviewBox").innerHTML = "";
    if(document.getElementById("scrollerForWord_###search###").classList.contains("nowVisible")){
      toggleClasses(document.getElementById("scrollerForWord_###search###"), "nowVisible", "nowHidden");
    }

    let catHolder = this.dom.querySelectorAll("#categoryHolderInner")[0];
    let scrollHolder = this.dom.querySelectorAll("#scrollerHolder")[0];
    let val = e.currentTarget.value.toLowerCase();
    let val_noWhiteSpace = val.replace(/^\s+/, '').replace(/\s+$/, '');
    this.reorderCategories();
    if(val_noWhiteSpace && val_noWhiteSpace != ""){
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
    let val = this.input.value.toLowerCase();
    let reviewsToDisplay = [];
    for(let i = 0 ; i < this.domLoader.reviews.length ; i++){
      let review = this.domLoader.reviews[i];
      if(review.text.includes(val)){
        reviewsToDisplay.push([review.review, review.stars]);
      }
    }
    if(reviewsToDisplay.length != 0){
      this.categoryObj.heldReviews = reviewsToDisplay;
      this.categoryObj.displayContent();
    }else{
      this.categoryObj.heldReviews = [];
      this.categoryObj.displayContent();
    }
  }

}
