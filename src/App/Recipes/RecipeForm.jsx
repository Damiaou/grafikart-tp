import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Field } from '../../ui/Field'
import { Loader } from '../../ui/Loader'
import { Button } from '../../ui/Button';
import { Trash } from '../../ui/Icon';
import { ApiError } from '../../utils/api';



export function CreateRecipeForm({ingredients, onSubmit}) {
    return <RecipeForm ingredients={ingredients} onSubmit={onSubmit} button='Create'/>
}



export function EditRecipeForm({ingredients, onSubmit, recipe}) {
    return (
        <RecipeForm ingredients={ingredients} onSubmit={onSubmit} recipe={recipe} button='Edit' />
    )
}

EditRecipeForm.propTypes = {
    recipe: PropTypes.object.isRequired,
    ingredients: PropTypes.array
}

export function RecipeForm({ingredients, onSubmit, recipe = {}, button}) {

    
    const {
        ingredients: recipeIngredients,
        addIngredient,
        updateQuantity,
        deleteIngredient,
        resetIngredients
    } = useIngredients(recipe.ingredients);

    const [errors, setErrors] = useState({});

    const filteredIngredients = (ingredients || []).filter(ingredient => {
        return !recipeIngredients.some(i => i.id === ingredient.id);
    })

    const handleSubmit = async function(e) {
        e.preventDefault();
        const form = e.target;
        const data = Object.fromEntries(new FormData(form))
        data.ingredients = recipeIngredients;
        setErrors({})
        try{
            await onSubmit(data);
            form.reset();
            resetIngredients();
        } catch (e) {
            if (e instanceof ApiError) {
                setErrors(e.errorPerField)
                console.error(e);
            }else {
                throw e
            }
        }
        
        
    }

    return (
        <form className='row' onSubmit={handleSubmit}>
            <div className="col-md-6">
                <Field defaultValue={recipe.title} error={errors.title} required name='title'>Titre</Field>
                <Field defaultValue={recipe.short} error={errors.short} required name='short' type='text-area'>Short description</Field>
                <Field defaultValue={recipe.content} error={errors.content} required name='content' type='text-area'>Content</Field>
            </div>
            <div className="col-md-6">
                <h5>Ingrédients</h5>
                {recipeIngredients.map(i => <IngredientRow ingredient={i} key={i.id} onChange={updateQuantity} onDelete={deleteIngredient}/>)}
                {ingredients ? <SelectIngredients ingredients={filteredIngredients} onChange={addIngredient}/>: <Loader />}
            </div>
            <Button className='pull-right mt-3' type='submit' >{button}</Button>
        </form>
    )
}

RecipeForm.propTypes = {
    ingredients: PropTypes.array,

}

function useIngredients (initial) {
    const [ingredients, setIngredients] = useState(initial || {});

    return {
        ingredients: ingredients,
        addIngredient: useCallback((ingredient) => {
            setIngredients(state => [...state, {...ingredient, quantity: 0}]);
        }, []),
        updateQuantity: useCallback((ingredient, quantity) => {
            setIngredients(state => state.map(i => i === ingredient ? { ...i, quantity}:i))
        }, []),
        deleteIngredient: useCallback((ingredient) => {
            setIngredients(state => state.filter(i => i !== ingredient))
        }, []),
        resetIngredients: useCallback(() => {
            setIngredients([])
        }, [])
        
    }
}

function IngredientRow ({ingredient, onChange, onDelete}) {
    const handleChange = function(e) {
        onChange(ingredient, parseInt(e.target.value));
    }
    return <div className="d-flex mb-3 align-items-center">
        <div className="mr-2">
            {ingredient.title}  
        </div>
        
        <Field type='number' className='mb-0' defaultValue={ingredient.quantity} placeholder='quantity' onChange={handleChange}/>
        <div className="ml-2">{ingredient.unit}</div>
        
        <Button type='danger' onClick={() => onDelete(ingredient)}><Trash /></Button>
    </div>
}


function SelectIngredients ({ ingredients, onChange }) {
    const handleChange = function (e) {
        onChange(ingredients[parseInt(e.target.value)])
    }
    return <select className='form-control' onChange={handleChange}>
        <option>Sélectionner un ingrédient</option>
        {ingredients.map((i, k) => <option key={i.id} value={k}>{i.title}</option>)}
    </select>
}

SelectIngredients.propTypes = {
    ingredients: PropTypes.array.isRequired
}

