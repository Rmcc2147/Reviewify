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
    review.text = review.review.querySelectorAll(".review-text")[0].textContent;
    review.keywords = this.getKeywords(review.text);

    return review;
  }

  getKeywords(text){
    let wordFreq = {};

    if(text.length == 0){
      return ['none'];
    }
    let parsedText = text.replace(/[^a-zA-Z ]/g, "").removeStopWords();

    let textArr = parsedText.split(" ");

    for (let i = 0; i < textArr.length; i++) {

      let word = textArr[i];

      if(word === ""){continue};

      if(!this.wordFreqAll[word]){
        this.wordFreqAll[word] = 1;
      }else{
        this.wordFreqAll[word]++;
      }
    }

    let keywords = parsedText.sortByKeyWords();
    console.log(this.mostCommon(this.wordFreqAll));
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

    return arr.slice(0, 20).map(x => x[0]);
  }

  match(text, array){
    let wordsToMatch = text.split(" ");

    for(let i = 0; i < wordsToMatch.length ; i++){
      for(let j = 0 ; j < array.length ; j++){
        if(isSimilar(wordsToMatch[i], array[j]){

        }
      }
    }
  }

  isSimilar(str1, str2){
    //https://github.com/cemerick/jsdifflib check this out
  }
}
