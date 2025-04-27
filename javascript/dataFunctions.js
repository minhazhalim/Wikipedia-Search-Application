export const getSearchTerm = () => {
     const rawSearchTerm = document.getElementById('search').value.trim();
     const regularExpression = /[]{2,}/gi;
     const searchTerm = rawSearchTerm.replaceAll(regularExpression,"");
     return searchTerm;
};
export const retrieveSearchResults = async (searchTerm) => {
     const wikiSearchString = getWikiSearchString(searchTerm);
     const wikiSearchResults = await requestData(wikiSearchString);
     let resultArray = [];
     if(wikiSearchResults.hasOwnProperty('query')){
          resultArray = processWikiResults(wikiSearchResults.query.pages);
     }
     return resultArray;
};
const getWikiSearchString = (searchTerm) => {
     const maximumCharacters = getMaximumCharacters();
     const rawSearchString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maximumCharacters}&exintro&explaintext&exlimit=max&format=json&origin=*`;
     const searchString = encodeURI(rawSearchString);
     return searchString;
};
export const getSuggestions = async (stringText) => {
     if(!stringText) return [];
     const apiUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(stringText)}&limit=10&namespace=0&format=json&origin=*`;
     try {
          const response = await fetch(apiUrl);
          const result = await response.json();
          return result[1];
     }catch(error){
          console.log(error);
          return [];
     }
};
const getMaximumCharacters = () => {
     const width = window.innerWidth || document.body.clientWidth;
     let maximumCharacters;
     if(width < 414){
          maximumCharacters = 65;
     }
     if(width >= 414 && width < 1400){
          maximumCharacters = 100;
     }
     if(width >= 1400){
          maximumCharacters = 130;
     }
     return maximumCharacters;
};
const requestData = async (searchString) => {
     try {
          const response = await fetch(searchString);
          const data = await response.json();
          return data;
     }catch(error){
          console.error(error);
     }
};
const processWikiResults = (results) => {
     const resultArray = [];
     Object.keys(results).forEach((key) => {
          const id = key;
          const title = results[key].title;
          const text = results[key].extract;
          const image = results[key].hasOwnProperty('thumbnail') ? results[key].thumbnail.source : null;
          const item = {id: id,title: title,image: image,text: text};
          resultArray.push(item);
     });
     return resultArray;
};