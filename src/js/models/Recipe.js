import axios from "axios";
import { key } from "../config";

/* const res = await axios(
  `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
); */

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      //getting the recipe by using object id and the api
      const res = await axios(
        `https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`
      );
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (error) {
      console.log(error);
      alert("Something went wrong :(");
    }
  }

  //how long to cook
  calcTime() {
    // Assuming that we need 15min for each 3 ing
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }
}
