import {PropTypes} from 'prop-types'
import { useState } from 'react'
import { Button } from '../ui/Button'
import { Loader } from '../ui/Loader'

export function Ingredients({ingredients, onDelete, onAdd, onUpdate}) {
    const [loading, setLoading] = useState(false);
    const [newIngredient, setNewIngredient] = useState('');
    const handleAdd = async function(e) {
        console.log(e);
        e.preventDefault();
        setLoading(true);
        await onAdd(newIngredient);
        setLoading(false);
    }
    return <div className='container-fluid'>
        <form>
            <div className="form-group">
                <label htmlFor="ingredient">Ajouter un ingrédient</label>
                <input value={newIngredient} type="text" name="ingredient" id="ingredient" className='form-control' onInput={e => setNewIngredient(e.target.value)}/>
            </div>
            <Button  type='submit' onClick={handleAdd} loading={loading}>Ajouter</Button>
        </form>
        <h1>Ingredients</h1>
        {!ingredients ? <Loader /> : <IngredientsList onDelete={onDelete} onUpdate={onUpdate} ingredients={ingredients} />}
        </div>
}

Ingredients.propTypes = {
    ingredients: PropTypes.array
}

export function IngredientsList ({ingredients, onDelete, onUpdate}) {
    
    return <>
        
        <ul>
            {ingredients.map(ingredient => <Ingredient key={ingredient.id} onDelete={onDelete} onUpdate={onUpdate} self={ingredient}/>)}
        </ul>
    </>
}

function Ingredient({self, onDelete, onUpdate}) {
    const [loading, setLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const handleInput = async function(e) {
        self.title = e.target.value
        setUpdateLoading(true);
        await onUpdate(self)
        setUpdateLoading(false);
    }
    const handleDelete = async function(e) {
        e.preventDefault();
        setLoading(true);
        await onDelete(self)
    }
    return <li key={self.id} className='mb-2'>
        <input disabled={loading} type="text" name="ingredient" id={self.id} value={self.title} onInput={handleInput}/>{updateLoading ? <Loader /> : ''}
        <Button  type='danger' onClick={handleDelete} loading={loading}>Supprimer</Button>
        </li>
}