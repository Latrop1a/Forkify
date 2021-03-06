import axios from "axios";
import { key } from "../config";

/* const res = await axios(
  `https://forkify-api.herokuapp.com/api/search?&q=${this.query}`
); */

export default class Search {
  constructor(query) {
    this.query = query;
  }
  async getResults() {
    try {
      const res = await axios(
        `https://www.food2fork.com/api/search?key=${key}&q=${this.query}`
      );
      this.result = res.data.recipes;
    } catch (error) {
      alert(error);
    }
  }
}



// Submitting a Query
// All search requests should be made to the search API URL.

//   https://www.food2fork.com/api/search
// All recipe requests should be made to the recipe details API URL.

//   https://www.food2fork.com/api/get
