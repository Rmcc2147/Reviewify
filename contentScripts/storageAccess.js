class StorageAccess{
  constructor(pathname){
    this.pathname = pathname;
    this.domParser = new DOMParser();
  }

  setReviews(arrToStore){
    const VALUE = JSON.stringify(this.parseForStoring(arrToStore));
    try{
      chrome.storage.local.set({[this.pathname] : VALUE});
    }catch(err){
      console.log(err);
      return null;
    }
  }

  async getDataFromStorage(){
    try{
      let returnData = await browser.storage.local.get(this.pathname);
      return this.parseFromStorage(JSON.parse(returnData[this.pathname]));
    }catch(err){
      return null;
    }
  }

  parseFromStorage(json){
    for (let i = 0; i < json.reviews.length; i++) {
      let tempDiv = this.domParser.parseFromString(json.reviews[i].review, "text/html")
      json.reviews[i].review = tempDiv.querySelectorAll(".review")[0];
    }
    return json;
  }

  parseForStoring(json){
    for (let i = 0; i < json.reviews.length; i++) {
      json.reviews[i].review = json.reviews[i].review.outerHTML;
    }
    return json;
  }
}
