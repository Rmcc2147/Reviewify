class ReviewGrabber{
  constructor(){
    this.url = document.getElementsByClassName("a-link-emphasis")[0].href;
    this.parser = new DOMParser();
    this.allReviews = [];
    this.doc;
  }

  isGood(str){
    if(str){return true}
  }

  async getPage(_url){
    if(!this.isGood(_url)){return undefined}
    else{
        const response = await fetch(_url);
        const text = await response.text();
        this.doc = this.parser.parseFromString(text, "text/html");
        this.url = this.nextUrl();
      }
  }

  nextUrl(){
    let _url = this.doc.getElementById("cm_cr-pagination_bar").children[0].lastChild.children[0].href;
    return _url;
  }

  async getReviews(){
    await this.getPage(this.url);
    let doc_reviews = this.doc.getElementsByClassName("review");
      let reviews = [];
      for (let i = 0; i < doc_reviews.length; i++) {
        let review = doc_reviews[i];
        reviews.push(review);
        this.allReviews.push(review);
      }
      return reviews;
  }

}
