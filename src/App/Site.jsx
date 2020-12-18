import React, { useEffect, useState } from "react";
import { useIngredients } from "../hooks/ingredients";
import { useRecipes } from "../hooks/recipes";
import { Ingredients } from "./Ingredients/Ingredients";
import { RecipeDetail } from "./Recipes/RecipeDetail";
import { Recipes } from './Recipes/Recipes'

export default function Site() {
  const [page, setPage] = useState("recipes");
  const {
    ingredients, 
    fetchIngredients,
    deleteIngredient,
    addIngredient,
    updateIngredient
  } = useIngredients()

  const {
    recipes,
    recipe,
    fetchRecipes,
    fetchRecipe,
    unselectRecipe
  } = useRecipes();


  let content = null;
  if (page === 'ingredients') {
      content = <Ingredients ingredients={ingredients} onDelete={deleteIngredient} onUpdate={updateIngredient} onAdd={addIngredient}/>
  } else if (page === 'recipes') {
      content = <Recipes recipes={recipes} onClick={fetchRecipe}/>
  }

  useEffect(function () {
    if (page === 'ingredients') {
      fetchIngredients()
    } else if (page === 'recipes') {
      fetchRecipes()
    }
  }, [page, fetchIngredients, fetchRecipes])


  return <>
    <NavBar currentPage={page} onClick={setPage}/>
    <div className="container">
      {recipe ? <RecipeDetail recipe={recipe} onClose={unselectRecipe}/> : null}
      {content}
    </div>    
  </>;
}

function NavBar({ currentPage, onClick }) {
  const navClass = function (page) {
    let className = "nav-item";
    if (page === currentPage) {
      className += " active";
    } 
    return className
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
      <a href="#recipes" className="navbar-brand">
        Recipes
      </a>
      <ul className=" navbar-nav mr-auto">
        <li className={navClass("recipes")}>
          <a href="#recipes" className="nav-link" onClick={() => onClick('recipes')}>
            Recipes
          </a>
        </li>
        <li className={navClass("ingredients")}>
          <a href="#ingredients" className="nav-link" onClick={() => onClick('ingredients')}>
            Ingredients
          </a>
        </li>
      </ul>
    </nav>
  );
}
