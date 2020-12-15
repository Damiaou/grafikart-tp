import { useReducer } from "react";
import { apiFetch } from "../utils/api";

function reducer(state, action) {
  console.log(`Recipe REDUCER action ->`, action);
  switch (action.type) {
    case "FETCHING_RECIPES":
      return { ...action, loading: true };
    case "SET_RECIPES":
      return {
        ...state,
        loading: false,
        recipes: action.payload,
      };
    case "SET_RECIPE":
      return {
        ...state,
        recipes: state.recipes.map((r) =>
          r.id === action.payload.id ? action.payload : r
        ),
      };
    case "FETCHING_RECIPE":
      return {
        ...state,
        recipeId: action.payload.id,
      };
    default:
      console.log("Action non géré -> " + action.type);
  }
}

export function useRecipes() {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    recipes: null,
    recipeId: null,
  });

  const recipe = state.recipes
    ? state.recipes.find(r => r.id === state.recipeId)
    : null;


  return {
    recipes: state.recipes,
    recipe: recipe,
    fetchRecipes: async function () {
      if (state.loading || state.recipes !== null) {
        return;
      }
      dispatch({ type: "FETCHING_RECIPES" });
      const recipes = await apiFetch("recipes");
      dispatch({ type: "SET_RECIPES", payload: recipes });
    },
    fetchRecipe: async function (recipe) {
      dispatch({ type: "FETCHING_RECIPE", payload: recipe });
      recipe = await apiFetch(`recipes/${recipe.id}`);
      dispatch({ type: "SET_RECIPE", payload: recipe });
    },
  };
}
