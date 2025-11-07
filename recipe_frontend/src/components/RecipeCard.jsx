import React from 'react';
import '../theme.css';

/**
 * PUBLIC_INTERFACE
 * RecipeCard - shows a recipe overview card.
 */
export default function RecipeCard({ recipe, onClick }) {
  return (
    <article className="card" style={{ display: 'grid', gridTemplateRows: '160px auto', cursor: 'pointer' }} onClick={onClick} aria-label={`View details for ${recipe.title}`}>
      <div style={{ background: 'linear-gradient(135deg, rgba(37,99,235,.12), rgba(245,158,11,.12))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 56 }}>🍲</span>
      </div>
      <div style={{ padding: '0.75rem 1rem' }}>
        <h3 style={{ margin: '0 0 0.25rem 0' }}>{recipe.title}</h3>
        <p style={{ margin: 0, color: 'rgba(17,24,39,0.7)' }}>{recipe.description || 'No description'}</p>
        <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {recipe.tags?.map((t) => (
            <span key={t} className="badge">{t}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
