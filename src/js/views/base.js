export const elements = {
         searchForm: document.querySelector(".search"),
         searchInput: document.querySelector(".search__field"),
         searchResList: document.querySelector(".results__list"),
         searchRes: document.querySelector(".results"),
         searchResPages: document.querySelector(".results__pages"),
       };

//to have the loader class from clearLoader() in a changeable String
export const elementStrings = {
  loader: "loader",
};

//loading spinner while awaiting
//parent so we can define where it spins; class loader from style.css
export const renderLoader = parent => {
  const loader = `
    <div class="${elementStrings.loader}">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;
  parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader) loader.parentElement.removeChild(loader);
}