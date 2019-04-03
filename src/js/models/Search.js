import axios from "axios";

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    const key = "1d94eef4472f6eafd001c647c02014a6";
    try {
      const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
      this.result = res.data.recipes;
      //console.log(this.result);
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
