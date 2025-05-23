export const deleteSearchResults = () => {
     const parentElement = document.getElementById('searchResults');
     let child = parentElement.lastElementChild;
     while(child){
          parentElement.removeChild(child);
          child = parentElement.lastElementChild;
     }
};
export const buildSearchResults = (resultArray) => {
     resultArray.forEach((result) => {
          const resultItem = createResultItem(result);
          const resultContents = document.createElement('div');
          resultContents.classList.add('resultContents');
          if(result.img){
               const resultImage = createResultImage(result);
               resultContents.append(resultImage);
          }
          const resultText = createResultText(result);
          resultContents.append(resultText);
          resultItem.append(resultContents);
          const searchResults = document.getElementById('searchResults');
          searchResults.append(resultItem);
     });
};
const createResultItem = (result) => {
     const resultItem = document.createElement('div');
     resultItem.classList.add('resultItem');
     const resultTitle = document.createElement('div');
     resultTitle.classList.add('resultTitle');
     const link = document.createElement('a');
     link.href = `https://en.wikipedia.org/?curid=${result.id}`;
     link.textContent = result.title;
     link.target = "_blank";
     resultTitle.append(link);
     resultItem.append(resultTitle);
     return resultItem;
};
const createResultImage = (result) => {
     const resultImage = document.createElement('div');
     resultImage.classList.add('resultImage');
     const image = document.createElement('img');
     image.src = result.img;
     image.alt = result.title;
     resultImage.append(image);
     return resultImage;
};
const createResultText = (result) => {
     const resultText = document.createElement('div');
     resultText.classList.add('resultText');
     const resultDescription = document.createElement('p');
     resultDescription.classList.add('resultDescription');
     resultDescription.textContent = result.text;
     resultText.append(resultDescription);
     return resultText;
};
export const clearStatsLine = () => {
     document.getElementById('stats').textContent = "";
};
export const setStatsLine = (numberOfResults) => {
     const stats = document.getElementById('stats');
     if(numberOfResults){
          stats.textContent = `Display ${numberOfResults} Results.`;
     }else{
          stats.textContent = "Sorry, no Results.";
     }
};