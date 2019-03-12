"use strict";

class DOMLoader{
  constructor(){
    this.url = location.url;
    this.dom;
    this.categories = [];
    this.catObjs = [];
    this.loadingBar;
  }

  loadDOM(){
    this.dom = document.createElement('div');
    this.dom.id = "outerDiv";
    this.dom.classList.add("noSelect");

    let categoryHolder = document.createElement('div');
    categoryHolder.id = "categoryHolder";
    let scrollerHolder = document.createElement('div');
    scrollerHolder.id = "scrollerHolder";

    let drag_resize = document.createElement('div');
    drag_resize.textContent = "^";
    drag_resize.id = "drag_resize";

    this.dom.appendChild(drag_resize);
    this.dom.appendChild(categoryHolder);
    this.dom.appendChild(scrollerHolder);

    makeResizable(this.dom);

    document.body.appendChild(this.dom);
  }

  appendReview(reviewJSON, keyword){
    for(let j = 0; j < this.catObjs.length; j++) {
      if(this.catObjs[j].category == keyword){
        this.catObjs[j].addReview(reviewJSON.review);
      }
    }
  }

  createLoadingBar(){
    this.loadingBar = new LoadingBar();
    const INSERT_HERE = this.dom.querySelectorAll("#drag_resize")[0];
    this.dom.insertBefore(this.loadingBar.wrapper, INSERT_HERE.nextSibling);
  }

  newCategory(keyword){
    this.categories.push(keyword);

    let newCategory = new Category(keyword)
    this.catObjs.push(newCategory);

    this.dom.querySelectorAll("#categoryHolder")[0].appendChild(newCategory.categoryButton);
    this.dom.querySelectorAll("#scrollerHolder")[0].appendChild(newCategory.scroller);

  }

  addReviews(reviewArr){

    if(typeof this.loadingBar == "object"){
      this.loadingBar.incrementProgress();
    }

    for (let i = 0; i < reviewArr.length; i++) {
      for (let j = 0 ; j < reviewArr[i].keywords.length ; j++){

        let keyword = reviewArr[i].keywords[j];

        if(!this.categories.includes(keyword)){
          this.newCategory(keyword);
        }

        this.appendReview(reviewArr[i], keyword);
      }
    }
  }
}

function makeResizable(elem){
  const RESIZER = elem.querySelectorAll("#drag_resize")[0];
  const MIN_HEIGHT = 118;
  const MAX_HEIGHT = window.innerHeight - 50;
  let original_height = 0;
  let original_y = 0;
  let original_mouse_y = 0;
  RESIZER.addEventListener("mousedown", function(e){
    RESIZER.classList.add("buttonClicked");
    e.preventDefault();
    original_height = parseFloat(getComputedStyle(elem, null).getPropertyValue('height').replace('px', ''));
    original_y = elem.getBoundingClientRect().top;
    original_mouse_y = e.pageY;
    window.addEventListener('mousemove', resize)
    window.addEventListener('mouseup', stopResize)
  })

  function resize(e){
    const height = original_height - (e.pageY - original_mouse_y);
    if(height > MIN_HEIGHT && height < MAX_HEIGHT){
      elem.style.height = height + 'px'
      elem.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
    }
  }

  function stopResize(e){
    RESIZER.classList.remove("buttonClicked");
    window.removeEventListener('mousemove', resize)
  }
}

class LoadingBar{
  constructor(){
    this.totalReviews = this.getReviewNum();
    this.reviewsFound = 0;
    this.wrapper = this.makeBar();
    this.loadingBar;
    this.percentageDone;
    this.backgroundBar;
  }

  getReviewNum(){
    let num_with_string = document.getElementById("acrCustomerReviewText");
    if(!num_with_string){
      num_with_string = document.getElementsByClassName("a-link-emphasis")[0].textContent;
    }else{
      num_with_string = num_with_string.textContent;
    }
    let num = parseFloat(num_with_string.replace(/\D/g,''));
    num = Math.ceil(num/10)*8;
    return num
  }

  makeBar(){
    let wrapper = document.createElement('div');
    wrapper.id = "loadingBar_wrapper";
    this.loadingBar = document.createElement('div');
    this.loadingBar.id = "loadingBar";
    this.backgroundBar = document.createElement('div');
    this.backgroundBar.id = "backgroundBar";
    wrapper.appendChild(this.backgroundBar);
    wrapper.appendChild(this.loadingBar);

    this.displayContent();

    return wrapper;
  }

  displayContent(){
    this.percentageDone = (this.reviewsFound/this.totalReviews)*100;
    this.loadingBar.textContent = this.percentageDone.toFixed(1) + "%";
    this.loadingBar.style.width = this.percentageDone.toFixed(1) + "%";
  }

  incrementProgress(){
    this.reviewsFound += 8;
    this.displayContent();
    if(this.percentageDone >= 100){
      this.removeBar();
    }
  }

  async removeBar(){
    setTimeout(function(){
      this.wrapper.remove();
    }.bind(this), 2500);
  }
}
