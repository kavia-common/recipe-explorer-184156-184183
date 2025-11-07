import React from 'react';
import RecipeCard from './RecipeCard';
import '../theme.css';

/**
 * PUBLIC_INTERFACE
 * RecipeGrid - responsive grid to render a list of recipes.
 */
export default function RecipeGrid({ recipes, onSelect }) {
  return (
    <section className="grid" aria-label="Recipes grid">
      {recipes.map((r) => (
        <div className="grid-item" key={r.id}>
          <RecipeCard recipe={r} onClick={() => onSelect?.(r)} />
        </div>
      ))}
    </section>
  );
}
