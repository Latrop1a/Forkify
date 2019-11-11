import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/searchView";
import { elements, renderLoader, clearLoader } from "./views/base";
import Axios from "axios";
import { key } from "./config";

/**
 *  HOLDS ALL CONTROLLERS AND THE STATE
 */

/** Global State of the app
 * - Search Object
 * - Current recipe Object
 * - Shopping list Object
 * - Liked recipes
 */
const state = {};

const search = new Search("pizza");
search.getResults();

/**
 * SEARCH CONTROLLER
 *
 */

const ctrlSearch = async () => {
  // 1 get query from view
  const query = searchView.getInput();
  if (query) {
    // 2 new search object and add to state
    state.search = new Search(query);
    // 3 Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchResList.parentElement);
    // 4 Get Recipes - returns promise and we await resolve
    await state.search.getResults();
    // 5 Render results on UI
    clearLoader();
    searchView.renderResults(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  ctrlSearch();
});

/**
 *  RECIPE CONTROLLER
 *
 */
