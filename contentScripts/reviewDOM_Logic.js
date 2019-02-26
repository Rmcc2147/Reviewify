let scrollers = [];

function getUser(element) {
    return $(element).find(".a-profile-name")[0].textContent;
}

function getTitle(element) {
  return $(element).find(".review-title")[0].textContent;
}

function getComment(element) {
  return $(element).find(".review-text")[0].textContent;
}

function loadStartupDOM(){
  let newElement = document.createElement('div');
  let reviewHolder = document.createElement('div');

  newElement.id = "newReviewHolder";
  reviewHolder.id = "trueReviewHolder";

  for(let i = 0 ; i < 5 ; i++){
    let newContainer = document.createElement('div');
    let expander = document.createElement('div');
    let reviewButtonOuter = document.createElement('div');
    let reviewButtonInner = document.createElement('div');
    let reviewButtonSpan = document.createElement('span');
    let commentIcon = document.createElement('div');

    let scroller = new Scroller(i);

    expander.id = "expanderForWord_UNSPECIFIED" + i;
    expander.classList.add('nowHidden');
    expander.classList.add('aReviewExpander');
    scroller.appendScroller(expander);
    //expander.appendChild(scroller);

    reviewButtonOuter.classList.add('reviewButtonOuter');

    reviewButtonInner.classList.add('reviewButtonInner');
    reviewButtonInner.appendChild(reviewButtonSpan);

    reviewButtonSpan.classList.add('reviewButtonSpan');
    reviewButtonSpan.textContent = "Loading..."

    commentIcon.classList.add('commentIcon');

    newContainer.id = "reviewContainerForWord_UNSPECIFIED" + i;
    newContainer.classList.add('aReviewContainer');

    reviewButtonOuter.appendChild(commentIcon);
    reviewButtonOuter.appendChild(reviewButtonInner);
    reviewButtonOuter.addEventListener('click', function(){
      let associated_expander = expander;
      let visibleElems = document.getElementsByClassName('nowVisible');

      for(let i = 0 ; i < visibleElems.length ; i++){
        if(visibleElems[i] != associated_expander){
          toggleClasses(visibleElems[i], 'nowVisible', 'nowHidden');
        }
      }

      if(associated_expander.classList.contains('nowHidden')){
        toggleClasses(associated_expander, 'nowHidden', 'nowVisible');
      }else{
        toggleClasses(associated_expander, 'nowVisible', 'nowHidden');
      }
    })
    newContainer.appendChild(reviewButtonOuter);
    newElement.appendChild(newContainer);
    reviewHolder.appendChild(expander);
    newElement.appendChild(reviewHolder);
    scrollers.push(scroller);
  }
  let div = document.getElementById('bundleV2_feature_div');
  div.parentNode.insertBefore(newElement, div.nextSibling);
}

function createDOM_Environment(reviewArr, sortedComments, _callback){

  for(let i = 0 ; i < sortedComments.length ; i++){
    if(sortedComments[i].length != 0){
      let keyWords = sortedComments[i];
      for(let j = 0 ; j < keyWords.length ; j++){
        if(document.getElementById("reviewContainerForWord_" + keyWords[j]) == undefined){
          createNewContainer(keyWords[j]);
        }
      }
    }
  }
  _callback(reviewArr, sortedComments);
}

function createNewContainer(identifier){
  let parent = document.getElementById("newReviewHolder");
  let reviewHolder = document.getElementById("trueReviewHolder");
  let expanderArray = $(".aReviewContainer");
  for(let i = 0 ; i < expanderArray.length ; i++){
    let reviewText = $(expanderArray[i]).find(".reviewButtonSpan").text();
    if (reviewText == "Loading..."){
      let current = $(expanderArray[i]);
      current.find(".reviewButtonSpan").text(identifier.charAt(0).toUpperCase() + identifier.slice(1));
      let thisContainer = document.getElementById("reviewContainerForWord_UNSPECIFIED".concat(i));
      thisContainer.id = "reviewContainerForWord_".concat(identifier);
      let thisExpander = document.getElementById("expanderForWord_UNSPECIFIED".concat(i));
      thisExpander.id = "expanderForWord_".concat(identifier);
      scrollers[i].setScrollerID("scrollerForWord_".concat(identifier));
      scrollers[i].setIdentifier(identifier);
      return;
    }
  }
}

function toggleClasses(elem, remove, add){
  elem.classList.remove(remove);
  elem.classList.add(add);
}

class DOMLoader{
  constructor(){
    this.url = location.url;
    this.dom;
    this.categories = [];
  }

  loadDOM(){
    this.dom = document.createElement('div');
    this.dom.id = "reviewHolder";

    let categoryHolder = document.createElement('div');
    categoryHolder.id = "categoryHolder";
    let scrollerHolder = document.createElement('div');
    scrollerHolder.id = "scrollerHolder";

    this.dom.appendChild(categoryHolder);
    this.dom.appendChild(scrollerHolder);

    let insert_dom_here = document.getElementById('bundleV2_feature_div');
    insert_dom_here.parentNode.insertBefore(this.dom, insert_dom_here.nextSibling);
  }

  newCategory(keyword){
    this.categories.push(keyword);
  }

  addReviews(reviewArr, contentArr){
    for (let i = 0; i < reviewArr.length; i++) {
      for (let j = 0 ; j < contentArr[i].keywords.length ; j++){
        let keyword = contentArr[i].keywords[j];
        if(!this.categories.includes(keyword)){
          this.newCategory(keyword);
        }
      }
    }
  }
}
