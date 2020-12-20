import React from "react";
import PropTypes from "prop-types";

import { useToggle } from '../../hooks/index'
import { Loader } from "../../ui/Loader";
import { Modal } from "../../ui/Modal";
import { Button } from "../../ui/Button";
import { EditRecipeForm } from "./RecipeForm";

export function RecipeDetail({ recipe, onClose, onEdit, ingredients, onDelete, onUpdate }) {
  return (
    <Modal title={recipe.title} onClose={() => onClose()}>
      {recipe.content 
        ? <RecipeContent 
            ingredients={ingredients} 
            recipe={recipe} 
            onEdit={onEdit} 
            onUpdate={onUpdate}
          /> 
        : <Loader />
      }
      <Button type='danger' onClick={() => onDelete(recipe)}>Delete</Button>
    </Modal>
  );
}

RecipeDetail.propTypes = {
  recipe: PropTypes.object.isRequired,
  ingredients: PropTypes.array
};

function RecipeContent({recipe, ingredients, onEdit, onUpdate}) {
  const [editMode, toggleEditMode] = useToggle(false);
  const arrayContent = recipe.content.split("\n");

  const handleUpdate = async function (data) {
    await onUpdate(recipe, data)
    toggleEditMode();
  }

  const handleEditMode = function() {
    toggleEditMode();
    onEdit()
  }
  return editMode ? 
      <EditRecipeForm 
        recipe={recipe} 
        ingredients={ingredients} 
        onSubmit={data => handleUpdate(data)}
      /> 
    : 
      <>
        <div>{arrayContent.map(l => <p>{l}</p>)}</div>
        <hr />
        <div>
            <h4>Ingredients</h4>
            <ul>{recipe.ingredients.map(i => <IngredientRow ingredient={i}/>)}</ul>
        </div>
        <Button onClick={handleEditMode}>Edit</Button>
      </>
}

function IngredientRow({ ingredient}) {
    return <li key={ingredient.id}>
        <strong>{ingredient.quantity}</strong> <strong>{ingredient.unit}</strong> {ingredient.title}
    </li>
}
