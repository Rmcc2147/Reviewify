function appendReview(reviewArr, keyWords){
  for (let i = 0 ; i < reviewArr.length ; i++){
    let currentKeyWords = keyWords[i];
      for(let j = 0 ; j <currentKeyWords.length ; j++){
        let finalKeyWord = currentKeyWords[j];
        for (let k = 0; k < scrollers.length; k++) {
          if(scrollers[k].getIdetifier() == finalKeyWord){
            scrollers[k].addReview(reviewArr[i]);
          }
        }
      }
  }
}
