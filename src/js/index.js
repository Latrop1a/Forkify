import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/searchView";
import { elements, renderLoader, clearLoader } from "./views/base";

/** Global State of the app
 * - Search Object
 * - Current recipe Object
 * - Shopping list Object
 * - Liked recipes
*/
const state = {};



/** 
 * SEARCH CONTROLLER
 * 
 */
const controlSearch = async () => {
  //1 Get search query from view
  const query = searchView.getInput(); //TODO

  if (query) {
    //2 New search object and add to state
    state.search = new Search(query);
    //3 Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);
    //4 Search for recipes - await promise return from async func
    await state.search.getResults();
    //5 Render results on UI after we get back results from query
    clearLoader();
    searchView.renderResults(state.search.result);
  }
};


elements.searchForm.addEventListener("submit", e => {
  e.preventDefault(); //no reload of page on click
  controlSearch();
});


//event delegation USING CLOSEST
elements.searchResPages.addEventListener("click", e => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});



/**
 *  RECIPE CONTROLLER
 * 
 */

const controlRecipe = () => {
  
  const r = new Recipe(47746);
  r.getRecipe();
  console.log(r);
};

controlRecipe();