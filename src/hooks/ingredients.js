import { useCallback, useReducer } from "react";
import { apiFetch } from "../utils/api";

function reducer(state, action) {
  console.log("INGREDIENTS REDUCER", action.type, action);
  switch (action.type) {
    case "FETCHING_INGREDIENTS":
      return { ...state, loading: true };
    case "SET_INGREDIENTS":
      return { ...state, ingredients: action.payload, loading: false };
    case "DELETE_INGREDIENT":
      return { ...state, ingredients: state.ingredients.filter(i => i !== action.payload), loading: false };
    case "ADD_INGREDIENT":
      return { ...state, ingredients: [action.payload, ...state.ingredients], loading: false };
    case "UPDATE_INGREDIENT":
      return { ...state, ingredients: state.ingredients.map(i => i === action.target ? action.payload : i), loading: false };
    default:
      return { ...state };
  }
}

export function useIngredients() {
  const [state, dispatch] = useReducer(reducer, {
    ingredients: null,
    loading: false,
  });

  return {
    ingredients: state.ingredients,
    fetchIngredients: useCallback(async function () {
      if (state.loading || state.ingredients) {
        return;
      }
      dispatch({ type: "FETCHING_INGREDIENTS" });
      const ingredients = await apiFetch("ingredients");
      dispatch({ type: "SET_INGREDIENTS", payload: ingredients });
    }, [state]),
    deleteIngredient: useCallback(async function (ingredient) {
        await apiFetch(`ingredients/${ingredient.id}`, {
            method:'DELETE'
        })
        dispatch({type: 'DELETE_INGREDIENT', payload: ingredient})
    }, []),
    addIngredient: useCallback(async function (ingredient) {
        const newIngredient = await apiFetch('ingredients', {
            method: 'POST',
            headers : {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(ingredient)
        })
        dispatch({type: 'ADD_INGREDIENT', payload: newIngredient})
    }, []),
    updateIngredient : useCallback(async function (ingredient) {
        const updatedIngredient = await apiFetch(`ingredients/${ingredient.id}`, {
            method: 'PUT',
            headers : {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(ingredient)
        })
        dispatch({type: 'UPDATE_INGREDIENT', payload:updatedIngredient})
    }, [])
  };
}
