let keywords = [];
async function parseReviews(reviewArr, contArr){
  let regex = /[.,!?]/g;
  let sortedComments = [];
  for(let i = 0 ; i < contArr.length ; i++){
    let contentTriple = contArr[i];
    sortedComments[i] = contentTriple[2].replace(regex, ' ').removeStopWords().sortByKeyWords();
    if(sortedComments[i].length == 0){
      sortedComments[i] = ['none'];
    }
    //keywords[i] = classifyText(contentTriple[1], contentTriple[2])
  }
  if(sortedComments.length != 0){
    createDOM_Environment(reviewArr, sortedComments, appendReview);
  }
}
