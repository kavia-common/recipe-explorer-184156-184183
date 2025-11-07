import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipes } from '../hooks/useRecipes';
import RecipeFormModal from '../components/RecipeFormModal';
import '../theme.css';

/**
 * PUBLIC_INTERFACE
 * RecipeDetailPage - view and edit a single recipe.
 */
export default function RecipeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { get, save } = useRecipes();
  const [recipe, setRecipe] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const r = await get(id);
      if (!r) {
        navigate('/');
        return;
      }
      setRecipe(r);
    })();
  }, [id, get, navigate]);

  const handleSave = async (payload) => {
    const updated = await save(payload);
    setRecipe(updated);
    setOpen(false);
  };

  if (!recipe) return null;

  return (
    <div className="container" style={{ paddingTop: '1rem' }}>
      <div className="card" style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="btn" onClick={() => navigate(-1)}>Back</button>
          <h1 style={{ margin: 0 }}>{recipe.title}</h1>
          <div className="badge" aria-label="Recipe ID" title={`ID ${recipe.id}`} style={{ marginLeft: 'auto' }}>ID {recipe.id}</div>
        </div>
        <div style={{ marginTop: 12 }}>
          <p style={{ marginTop: 0 }}>{recipe.description || 'No description.'}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {recipe.tags?.map((t) => (<span key={t} className="badge">{t}</span>))}
          </div>
        </div>
        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <button className="btn btn-primary" onClick={() => setOpen(true)}>Edit</button>
        </div>
      </div>
      <RecipeFormModal open={open} initial={recipe} onClose={() => setOpen(false)} onSave={handleSave} />
    </div>
  );
}
