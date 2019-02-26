class DOMLoader{
  constructor(){
    this.url = location.url;
    this.dom;
    this.categories = [];
    this.scrollers = [];
  }

  loadDOM(){
    this.dom = document.createElement('div');
    this.dom.id = "outerDiv";

    let categoryHolder = document.createElement('div');
    categoryHolder.id = "categoryHolder";
    let scrollerHolder = document.createElement('div');
    scrollerHolder.id = "scrollerHolder";

    let drag_resize = document.createElement('div');
    drag_resize.id = "drag_resize";

    this.dom.appendChild(drag_resize);
    this.dom.appendChild(categoryHolder);
    this.dom.appendChild(scrollerHolder);

    makeResizable(this.dom)
    let insert_dom_here = document.getElementById('bundleV2_feature_div');
    insert_dom_here.parentNode.insertBefore(this.dom, insert_dom_here.nextSibling);
  }

  appendReview(reviewJSON){
    for (let i = 0; i < reviewJSON.keywords.length; i++) {
      for (let j = 0; j < this.scrollers.length; j++) {
        if(this.scrollers[j].category == reviewJSON.keywords[i]){
          this.scrollers[j].addReview(reviewJSON.review);
        }
      }
    }
  }

  newCategory(keyword){
    this.categories.push(keyword);

    let newCatBut = this.newCategoryButton(keyword);
    let newScroller = new Scroller(keyword)
    this.scrollers.push(newScroller);

    this.dom.querySelectorAll("#categoryHolder")[0].appendChild(newCatBut);
    newScroller.appendScroller(this.dom.querySelectorAll("#scrollerHolder")[0])

  }

  newCategoryButton(keyword){
    let categoryButtonOuter = document.createElement("div");
    let categoryButtonInner = document.createElement("div");
    let categoryButtonSpan = document.createElement("span");
    let commentIcon = document.createElement("div");

    categoryButtonOuter.id = "categoryButtonForWord_" + keyword;
    categoryButtonOuter.classList.add('categoryButtonOuter');
    categoryButtonInner.classList.add('categoryButtonInner');
    categoryButtonSpan.classList.add('categoryButtonSpan');
    categoryButtonSpan.classList.add('noSelect');
    commentIcon.classList.add('commentIcon');

    categoryButtonSpan.textContent = keyword;

    categoryButtonOuter.addEventListener("click", function(){
      let associated_scroller = document.getElementById("scrollerForWord_" + keyword);
      let visibleElems = document.getElementsByClassName('nowVisible');

      for(let i = 0 ; i < visibleElems.length ; i++){
        if(visibleElems[i] != associated_scroller){
          toggleClasses(visibleElems[i], 'nowVisible', 'nowHidden');
        }
      }

      if(associated_scroller.classList.contains('nowHidden')){
        toggleClasses(associated_scroller, 'nowHidden', 'nowVisible');
      }else{
        toggleClasses(associated_scroller, 'nowVisible', 'nowHidden');
      }
    })

    categoryButtonInner.appendChild(categoryButtonSpan);
    categoryButtonOuter.appendChild(commentIcon);
    categoryButtonOuter.appendChild(categoryButtonInner);

    return categoryButtonOuter;
  }

  addReviews(reviewArr){
    for (let i = 0; i < reviewArr.length; i++) {
      for (let j = 0 ; j < reviewArr[i].keywords.length ; j++){

        let keyword = reviewArr[i].keywords[j];

        if(!this.categories.includes(keyword)){
          this.newCategory(keyword);
        }

        this.appendReview(reviewArr[i]);
      }
    }
  }
}

function makeResizable(elem){
  const RESIZER = elem.children[0];
  const MIN_HEIGHT = 118;
  let original_height = 0;
  let original_y = 0;
  let original_mouse_y = 0;
  RESIZER.addEventListener("mousedown", function(e){
    e.preventDefault();
    original_height = parseFloat(getComputedStyle(elem, null).getPropertyValue('height').replace('px', ''));
    original_y = elem.getBoundingClientRect().top;
    original_mouse_y = e.pageY;
    window.addEventListener('mousemove', resize)
    window.addEventListener('mouseup', stopResize)
  })

  function resize(e){
    const height = original_height - (e.pageY - original_mouse_y);
    if(height > MIN_HEIGHT){
      elem.style.height = height + 'px'
      elem.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
    }
  }

  function stopResize(){
    window.removeEventListener('mousemove', resize)
  }
}
