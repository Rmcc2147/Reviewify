async function getKeywords(text){
  let result = await classifyText(text);
  return result;
}

async function classifyText(title, text){
  let key = "EX1NBUyoWimshYDXp3RlF1A2sHtKp1fWYQtjsnMnI1URHaf8BI";
  let url = "https://twinword-text-classification.p.rapidapi.com/classify/?title=" + title + "&text=" + text;

  return fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": key,
      "Content-Type": "application/x-www-form-urlencoded"
    },
  })
  .then(response => response.json());
}
