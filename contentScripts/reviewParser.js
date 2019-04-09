"use strict";

class ReviewParser{
  constructor(){
    this.wordFreqAll = {};
  }

  parseReviews(reviewArr){
    return reviewArr.map(function(review){
      return this.getReviewContent(review);
    }.bind(this));
  }

  getReviewContent(review){
    review.title = review.review.querySelectorAll(".review-title")[0].textContent;
    review.text = review.review.querySelectorAll(".review-text")[0].textContent.replace(/[^a-zA-Z ]/g, "").removeStopWords();
    review.keywords = this.match(review.text, this.getKeywords(review.text));
    review.stars = this.getStarRating(review.review);
    return review;
  }

  getKeywords(text){
    let wordFreq = {};

    let textArr = text.split(" ");

    for (let i = 0; i < textArr.length; i++) {
      let added = false;
      let word = textArr[i];
      let key = word;

      if(word.length < 4){continue};

      let keys = Object.keys(this.wordFreqAll);
      for(let i = 0 ; i < keys.length ; i++){
        if(this.isSimilar(word, keys[i])){
          added = true;
          key = keys[i];
        }
      }
      if(!this.wordFreqAll[word] && added === false){
        this.wordFreqAll[word] = 1;
      }else{
        this.wordFreqAll[key]++;
      }
    }

    let keywords = text.sortByKeyWords();
    return this.mostCommon(this.wordFreqAll);
  }

  mostCommon(json){
    let words = json;
    let arr = [];
    let keys = Object.keys(words);

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i]
      arr.push([key, words[key]]);
    }

    arr.sort(function(a, b){
      return b[1] - a[1];
    })

    return arr.map(x => x[0]);
  }

  match(text, array){
    let wordsToMatch = text.split(" ");
    let matched = [];

    for(let i = 0; i < wordsToMatch.length ; i++){
      for(let j = 0 ; j < array.length ; j++){
        if(this.isSimilar(wordsToMatch[i], array[j]) && !matched.includes(array[j])){
          matched.push(array[j]);
        }
      }
    }
    if(matched.length != 0){
      return matched;
    }else{return ['none'];}
  }

  isSimilar(str1, str2){
    let statement = (str1 === str2 || str1.includes(str2));
    if(statement){return true;}else{return false;}
  }

  getStarRating(elem){
    return parseInt(elem.querySelectorAll(".a-icon-alt")[0].textContent[0]);
  }
}
