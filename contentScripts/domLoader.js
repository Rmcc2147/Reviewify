"use strict";

class DOMLoader{
  constructor(){
    this.url = location.url;
    this.dom;
    this.reviews = [];
    this.categories = [];
    this.catObjs = [];
    this.loadingBar;
    this.searchBar;
  }

  loadDOM(){
    this.dom = document.createElement('div');
    this.dom.id = "outerDiv";
    this.dom.classList.add("noSelect");
    this.dom.classList.add("hideScroll");

    let outerWrapper = document.createElement('div');
    outerWrapper.id = "outerWrapper";
    let categoryHolder = document.createElement('div');
    categoryHolder.id = "categoryHolder";
    let categoryHolderInner = document.createElement('div');
    categoryHolderInner.id = "categoryHolderInner";
    let scrollerHolder = document.createElement('div');
    scrollerHolder.id = "scrollerHolder";
    let searchHolder = document.createElement('div');
    searchHolder.id = "searchHolder";

    let drag_resize = document.createElement('div');
    drag_resize.textContent = "^";
    drag_resize.id = "drag_resize";

    this.dom.appendChild(drag_resize);
    categoryHolder.appendChild(categoryHolderInner);
    outerWrapper.appendChild(categoryHolder);
    outerWrapper.appendChild(scrollerHolder);
    outerWrapper.appendChild(searchHolder);

    this.dom.appendChild(outerWrapper);

    makeResizable(this.dom);

    document.body.appendChild(this.dom);
    this.searchBar = new SearchBar(this);
    this.searchBar.input.addEventListener("change", this.searchBar.onChange.bind(this));
    categoryHolder.insertBefore(this.searchBar.reviewBox, categoryHolder.firstChild);
    categoryHolder.insertBefore(this.searchBar.base, categoryHolder.firstChild);
  }

  appendReview(reviewJSON, keyword){
    for(let j = 0; j < this.catObjs.length; j++) {
      if(this.catObjs[j].category == keyword){
        this.catObjs[j].addReview(reviewJSON.review, reviewJSON.stars);
      }
    }
  }

  createLoadingBar(){
    this.loadingBar = new LoadingElement();
    const INSERT_HERE = this.dom.children[1].firstChild;
    this.dom.children[1].insertBefore(this.loadingBar.wrapper, INSERT_HERE);
  }

  newCategory(keyword){
    this.categories.push(keyword);

    let newCategory = new Category(keyword)
    this.catObjs.push(newCategory);

    this.dom.querySelectorAll("#categoryHolderInner")[0].appendChild(newCategory.categoryButton);
    this.dom.querySelectorAll("#scrollerHolder")[0].appendChild(newCategory.scroller);

  }

  addReviews(reviewArr){
    this.reviews = reviewArr;

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

  reorderCategories(){
    this.dom.querySelectorAll("#categoryHolderInner")[0].innerHTML = "";
    this.dom.querySelectorAll("#scrollerHolder")[0].innerHTML = "";

    this.catObjs.sort(function(a, b){
      return b.heldReviews.length - a.heldReviews.length;
    });

    for(let i = 0 ; i < 10 ; i++){
      this.dom.querySelectorAll("#categoryHolderInner")[0].appendChild(this.catObjs[i].categoryButton);
      this.dom.querySelectorAll("#scrollerHolder")[0].appendChild(this.catObjs[i].scroller);
    }


  }
}//DOMLoader

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
    window.removeEventListener('mousemove', resize);
  }
}//makeResizable

class LoadingElement{
  constructor(){
    this.totalReviews = this.getReviewNum();
    this.reviewsFound = 0;
    this.wrapper = this.makeLoadingElement();
    this.loadingCircle;
    this.percentageDone;
    this.displayedText;
  }

  getReviewNum(){
    let num_with_string = document.getElementById("acrCustomerReviewText");
    if(!num_with_string){
      num_with_string = document.getElementsByClassName("a-link-emphasis")[0].textContent;
    }else{
      num_with_string = num_with_string.textContent;
    }
    let num = parseFloat(num_with_string.replace(/\D/g,''));
    console.log(num);
    return num
  }

  makeLoadingElement(){
    let wrapper = document.createElement('div');
    wrapper.id = "loadingBar_wrapper";

    this.loadingCircle = document.createElement('div');
    this.loadingCircle.id = "loadingCircle";
    wrapper.appendChild(this.loadingCircle);

    this.displayedText = document.createElement('div');
    this.displayedText.id = "displayedText";
    this.displayedText.textContent = "0.0%";
    wrapper.appendChild(this.displayedText);

    this.displayContent();

    return wrapper;
  }

  displayContent(){
    this.percentageDone = (this.reviewsFound/this.totalReviews)*100;
    this.displayedText.textContent = this.percentageDone.toFixed(1) + "%";
  }

  incrementProgress(){
    this.reviewsFound += 10;
    console.log(this.reviewsFound);
    this.displayContent();
    if(this.percentageDone >= 100 || this.reviewsFound >= this.totalReviews){
      this.removeBar();
    }
  }

  async removeBar(){
    this.displayedText.textContent = "100%";
    setTimeout(function(){
      this.wrapper.remove();
    }.bind(this), 2500);
  }
}//LoadingElement
