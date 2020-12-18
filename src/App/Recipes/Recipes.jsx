import PropTypes from "prop-types";
import React, { memo } from "react";
import { Button } from "../../ui/Button";
import { Loader } from "../../ui/Loader";

export function Recipes({ recipes, onClick }) {
  if (recipes === null || !recipes) {
    return <Loader />;
  }

  return (
    <div className="row">
      {recipes.map((recipe) => (
        <div className="col-md-4 mb-4" key={recipe.id}>
          <Recipe self={recipe} onClick={onClick} />
        </div>
      ))}
    </div>
  );
}

Recipes.propTypes = {
  recipes: PropTypes.array,
  onClick: PropTypes.func.isRequired,
};

const Recipe = memo(function ({ self, onClick }) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">{self.title}</div>
        <p className="card-text">{self.short}</p>
        <Button onClick={() => onClick(self)}>See the recipe</Button>
      </div>
    </div>
  );
});