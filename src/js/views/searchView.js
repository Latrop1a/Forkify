//dom strings import
import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => (elements.searchInput.value = "");

export const clearResults = () => (elements.searchResList.innerHTML = "");

const limitRecipeTitle = (title, limit = 17) => {
  let wordsArr,
    newTitle = "";
  if (title.length > limit) {
    //Split into words
    wordsArr = title.split(" ");
    //
    wordsArr.reduce((acc, cur) => {
      if (cur.length + acc < limit) {
        newTitle = `${newTitle} ${cur}`;
      }
      return cur.length + acc;
    }, 0);
    title = `${newTitle} ...`;
  }
  return title;
};

// puts one result onto UI
const renderRecipe = recipe => {
  const formatTitle = limitRecipeTitle(recipe.title);
  const markup = `<li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                      <figure class="results__fig">
                        <img src=${recipe.image_url} alt="${formatTitle}">
                      </figure>
                      <div class="results__data">
                        <h4 class="results__name">${formatTitle}</h4>
                        <p class="results__author">${recipe.publisher}</p>
                      </div>
                    </a>
                </li>`;
  // insert element after the others
  elements.searchResList.insertAdjacentHTML("beforeend", markup);
};

/**
 * Returns HTML string for button rendering
 * @param {*} type - "prev" or "next" 
 */
const createButton = (page, type) => `
  <button class="btn-inline results__btn--${type}" data-goto=${type === "prev" ? page-1 : page+1}>
    <svg class="search__icon">
      <use href="img/icons.svg#icon-triangle-${type === "prev" ? "left" : "right"}"></use>
    </svg>
    <span>Page ${type === "prev" ? page-1 : page+1}</span>
  </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);

  let button;
  if (page === 1) {
    // Button to go next only
    button = createButton(page, "next");
  } else if (page === pages && pages > 1) {
    // Button to go prev only
    button = createButton(page, "prev");
  } else {
    //both buttons
    button = `
      ${createButton(page, "prev")};
      ${createButton(page, "next")};
    `;
  }

  elements.searchResPages.insertAdjacentHTML("afterbegin", button);
};

// renders results
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  const start = resPerPage * (page-1);
  const end = resPerPage * page; //not -1 because slice does not include end element

  //slice gets the right portion of the array
  //forEach renders all elements one by one. cur ele gets passed into automatically
  recipes.slice(start, end).forEach(renderRecipe);
  renderButtons(page, recipes.length, resPerPage);
};
