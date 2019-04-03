//dom strings import
import { elements } from "./base";

//getting input from search field
export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = "";  //curly braces so we dont have implicit return
}

//clear all results by setting inner HTML to nothing
export const clearResults = () => {
  elements.searchResList.innerHTML = "";
  elements.searchResPages.innerHTML = "";
}

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  //render results of current page
  const start = (page-1) * resPerPage;
  const end = page * resPerPage;
  //loops through 30 results from array and calls renderRecipe
  //slice returns new array with start to end not included
  recipes.slice(start, end).forEach(renderRecipe);

  //render pagination buttons
  renderButtons(page, recipes.length, 10);
};

const renderRecipe = recipe => {
  //recipe html template string
  const titleShortened = limitRecipeTitle(recipe.title);
  const markup = `
    <li>
      <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
          <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
          <h4 class="results__name">${titleShortened}</h4>
          <p class="results__author">${recipe.publisher}</p>
        </div>
      </a>
    </li>
  `;
  //insert the markup here, one after the other, at the end of the inside tag
  elements.searchResList.insertAdjacentHTML("beforeend", markup);
};

/*
    -- PAGEINATION
*/

//rendering page button on page, and we need to know how many pages total
const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage); //how many pages total
  let button;
  if (page ===1 && pages > 1) {
    // Button to go next page
    button = createButton(page, "next");
  } else if (page < pages) {
    // Buttons to go back and forth
    button = `${createButton(page, "next")}
              ${createButton(page, "prev")}
              `;
  } else if (page === pages && pages > 1) {
    //Button to go back
    button = createButton(page, "prev");
  }

  elements.searchResPages.insertAdjacentHTML("afterbegin", button);
};

//type: "prev" or "next"
//data-goto for event handler later on
const createButton = (page, type) => `
  <button class="btn-inline results__btn--${type}" data-goto=${type === "prev" ? page - 1 : page + 1}>
    <svg class="search__icon">
      <use href="img/icons.svg#icon-triangle-${type === "prev" ? "left" : "right"}"></use>
    </svg>
    <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
  </button>
`;






/** MY TRY Beforehand. Basically the same*/
// //breaks down title so its one line and dots
// const limitRecipeTitle = (title, limit = 17) => {
//   if (title.length > limit) {
//     let newTitle = "";
//     title.split(" ").forEach(el => {
//       if ((newTitle.length+el.length+1) < limit) {
//         newTitle = newTitle + " " + el;
//       }
//     });
//     return newTitle + " ...";
//   }
//   return title;
// };

//breaks down title so its one line and dots
const limitRecipeTitle = (title, limit = 17) => {
  //adding stuff to an array is not mutating
  const newTitle = [];
  if (title.length > limit) {
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      //we return the new acc for the next callback function call
      return acc + cur.length;
    }, 0);
    //return string with all the words joined together with spaces in between and 3 dots at end to show its longer
    return `${newTitle.join(" ")} ...`;
  }
  return title;
};


