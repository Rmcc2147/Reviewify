"use strict";

String.prototype.sortByKeyWords = function(){
  let stringToSort = this.valueOf();
  let priceKeyWords = new Array(
    'price',
    'pricing',
    'cost',
    'costs',
    'costly',
    'expensive',
    'cheap',
    'money',
    'pound',
    'quid',
    'dollar',
    'deal',
    'expense',
    'pay',
    'payment',
    'worth',
    'value'
  )
  let enjoymentKeyWords = new Array(
    'enjoy',
    'enjoyment',
    'fun',
    'love',
    'cool',
    'awesome',
    'loves',
    'enjoys',
    'amazing',
    'fascinating',
    'hate',
    'dislike',
    'hates',
    'dislikes',
    'disappointed',
    'disappointment',
    'boring',
    'bored',
    'bores'
  )
  let qualityKeyWords = new Array(
    'quality',
    'broke',
    'broken',
    'break',
    'smash',
    'worthless',
    'faulty',
    'attractive',
    'stylish',
    'small',
    'big',
    'large',
    'compact'
  )
  let deliveryKeyWords = new Array(
    'delivery',
    'delivered',
    'shipping',
    'shipped',
    'post',
    'posted',
    'arrive',
    'arrived',
    'courier'
  )
  let keyWordArray = [priceKeyWords, enjoymentKeyWords, qualityKeyWords, deliveryKeyWords];
  let keyWordCategories = ['price', 'enjoyment', 'quality', 'delivery'];
  let returnThis = [];

  let wordsToMatch = stringToSort.split(" ");

  for(let i = 0 ; i < keyWordArray.length ; i++){
    let currentKeyWords = keyWordArray[i];
    if(searchWords(currentKeyWords, wordsToMatch)){
      returnThis.push(keyWordCategories[i]);
    }
  }

  if(returnThis.length === 0){
    returnThis[0] = "none";
  }

  return returnThis;
}

function searchWords(keyWords, words){
  for(let i = 0 ; i < words.length ; i++){
    for(let j = 0 ; j < keyWords.length ; j++){
      if(JSON.stringify(words[i]) == JSON.stringify(keyWords[j])){
        return true;
      }
    }
  }
}
