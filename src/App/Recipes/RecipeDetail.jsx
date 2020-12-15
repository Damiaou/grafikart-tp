import React from 'react'
import PropTypes from 'prop-types'
import { Loader } from '../../ui/Loader'

export function RecipeDetail({recipe}) {
    return (
        <div>
            <h1>{recipe.title}</h1>
            {recipe.content ? recipe.content: <Loader />}
        </div>
    )
}

RecipeDetail.propTypes = {
    recipe: PropTypes.object.isRequired,
}

