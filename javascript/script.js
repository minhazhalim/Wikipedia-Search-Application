import {setSearchFocus,showClearTextButton,clearSearchText,clearPushListener} from './searchBar.js';
import {deleteSearchResults,buildSearchResults,clearStatsLine,setStatsLine} from './searchResults.js';
import {getSearchTerm,getSuggestions,retrieveSearchResults} from './dataFunctions.js';
const showSuggestions = (suggestions) => {
     const searchButton = document.getElementById('searchButton');
     const footer = document.querySelector('footer');
     let suggestionBox = document.getElementById('suggestionBox');
     suggestionBox.classList.add('suggestion-box');
     document.getElementById('searchBar').appendChild(suggestionBox);
     suggestionBox.innerHTML = "";
     suggestions.forEach(suggestion => {
          let li = document.createElement('li');
          li.textContent = suggestion;
          li.addEventListener('click',() => {
               document.getElementById('search').value = suggestion;
               processTheSearch();
               suggestionBox.innerHTML = "";
               footer.style.display = 'none';
          });
          suggestionBox.appendChild(li);
     });
     if(suggestions.length === 0){
          suggestionBox.innerHTML = "";
     }
     searchButton.addEventListener('click',() => {
          suggestionBox.innerHTML = "";
     });
};
const handleAutoComplete = async (event) => {
     const suggestions = await getSuggestions(event.target.value.trim());
     showSuggestions(suggestions);
};
const initApplication = () => {
     setSearchFocus();
     const search = document.getElementById('search');
     search.addEventListener('input',showClearTextButton);
     search.addEventListener('input',handleAutoComplete);
     const clear = document.getElementById('clear');
     clear.addEventListener('click',clearSearchText);
     clear.addEventListener('keydown',clearPushListener);
     const form = document.getElementById('searchBar');
     form.addEventListener('submit',submitTheSearch);
};
document.addEventListener('readystatechange',(event) => {
     if(event.target.readyState === 'complete') initApplication();
});
const processTheSearch = async () => {
     clearStatsLine();
     const searchTerm = getSearchTerm();
     if(searchTerm === "") return;
     const resultArray = await retrieveSearchResults(searchTerm);
     if(resultArray.length){
          buildSearchResults(resultArray);
     }
     setStatsLine(resultArray.length);
};
const submitTheSearch = (event) => {
     event.preventDefault();
     deleteSearchResults();
     processTheSearch();
     setSearchFocus();
};