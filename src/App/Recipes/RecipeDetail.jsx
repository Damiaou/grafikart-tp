import React from "react";
import PropTypes from "prop-types";

import { Loader } from "../../ui/Loader";
import { Modal } from "../../ui/Modal";

export function RecipeDetail({ recipe, onClose }) {
  return (
    <Modal title={recipe.title} onClose={() => onClose()}>
      {recipe.content ? <RecipeContent recipe={recipe} /> : <Loader />}
    </Modal>
  );
}

RecipeDetail.propTypes = {
  recipe: PropTypes.object.isRequired,
};

function RecipeContent({recipe}) {
    const arrayContent = recipe.content.split("\n");
    return <>
        <div>{arrayContent.map(l => <p>{l}</p>)}</div>
        <hr />
        <div>
            <h4>Ingredients</h4>
            <ul>{recipe.ingredients.map(i => <IngredientRow ingredient={i}/>)}</ul>
        </div>
        
    </>
}

function IngredientRow({ ingredient}) {
    return <li key={ingredient.id}>
        <strong>{ingredient.quantity}</strong> <strong>{ingredient.unit}</strong> {ingredient.title}
    </li>
}
