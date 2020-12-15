/* eslint-disable react/prop-types */
import {PropTypes} from 'prop-types'
import React, { memo, useState } from 'react'
import { Button } from '../../ui/Button'
import { Field } from '../../ui/Field';
import { Trash } from '../../ui/Icon';
import { Loader } from '../../ui/Loader'
import { ApiError } from '../../utils/api';

export function Ingredients({ingredients, onDelete, onAdd, onUpdate}) {
    return <div className='container-fluid'>
            <h1>Ingredients</h1>
            <CreateIngredientForm onAdd={onAdd} />
            
            {!ingredients ? <Loader /> : <IngredientsList onDelete={onDelete} onUpdate={onUpdate} ingredients={ingredients} />}
        </div>
}

Ingredients.propTypes = {
    ingredients: PropTypes.array
}

function CreateIngredientForm({onAdd, ...props}) {
    const [loading, setLoading] = useState(false);
    const [newIngredient, setNewIngredient] = useState({title: '', unit: ''});
    const [emptyTitle, setEmptyTitle] = useState(false)

    const handleAdd = async function(e) {
 
        e.preventDefault();
        setLoading(true);
        if (newIngredient.title === '') {
            setLoading(false);
            setEmptyTitle(true)
            return;
        }

        
        await onAdd(newIngredient);
        setNewIngredient({title: '', unit: ''});
        setLoading(false);
        
    }


    return  <form {...props} className='mb-4'>
        <Field value={newIngredient.title} type="text" name="title" id="title"
        onInput={e => setNewIngredient({unit: newIngredient.unit, title: e.target.value})} error={emptyTitle}>Title</Field>
        <Field value={newIngredient.unit} type="text" name="unit" id="unit"
        onInput={e => setNewIngredient({unit: e.target.value, title: newIngredient.title})}>Unit</Field>
        <Button  type='submit' onClick={handleAdd} loading={loading}>Ajouter</Button>
    </form>
}


export function IngredientsList ({ingredients, onDelete, onUpdate}) {
    
    return <>
        
        <ul className='list-group'>
            {ingredients.map(ingredient => <Ingredient key={ingredient.id} onDelete={onDelete} onUpdate={onUpdate} self={ingredient}/>)}
        </ul>
    </>
}

const Ingredient = memo(function ({self, onDelete, onUpdate}) {
    const [loading, setLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const handleInput = async function(e) {
        e.target.classList.remove('is-invalid');
        setUpdateLoading(true);

        if (e.target.id.includes('title')){
            self.title = e.target.value
        } else if (e.target.id.includes('unit')){
            self.unit = e.target.value
        }
        const element = e;
        try{
            await onUpdate(self)
        } catch (e) {
            if (e instanceof ApiError) {
                console.log(element.target);
                element.target.classList.add('is-invalid')
            }
            throw e;
        }
        
        setUpdateLoading(false);
    }
    const handleDelete = async function(e) {
        e.preventDefault();
        setLoading(true);
        await onDelete(self)
    }
    return <li key={self.id} className='form-inline mb-1'>
            <Field disabled={loading} type="text" name="title" id={`${self.id}_title`} value={self.title} onInput={handleInput} className='mr-2'/>
            <Field  disabled={loading} type="text" name="unit" id={`${self.id}_unit`} value={self.unit} onInput={handleInput} className='mr-2'/>
            {updateLoading ? <Loader /> : ''}
            <Button type='danger' onClick={handleDelete} loading={loading}><Trash/></Button>
        </li>
});