import React, { useMemo, useState } from 'react';
import Filters from '../components/Filters';
import RecipeGrid from '../components/RecipeGrid';
import RecipeFormModal from '../components/RecipeFormModal';
import { useRecipes } from '../hooks/useRecipes';
import '../theme.css';
import { useNavigate } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * RecipeListPage - shows filters and recipes list/grid with create modal.
 */
export default function RecipeListPage() {
  const { recipes, filters, setFilters, loading, list, save } = useRecipes();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSave = async (r) => {
    await save(r);
    setOpen(false);
    list();
  };

  const subtitle = useMemo(() => {
    const parts = [];
    if (filters.query) parts.push(`Search "${filters.query}"`);
    if (filters.tag) parts.push(`#${filters.tag}`);
    return parts.join(' · ');
  }, [filters]);

  return (
    <div className="container" style={{ paddingTop: '1rem' }}>
      <div className="layout">
        <Filters
          query={filters.query}
          tag={filters.tag}
          onChange={(p) => setFilters({ ...filters, ...p })}
        />
        <main className="content">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <h1 style={{ margin: 0 }}>Recipes</h1>
              {subtitle && <div style={{ color: 'rgba(17,24,39,0.65)', marginTop: 4 }}>{subtitle}</div>}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn" onClick={() => list()} disabled={loading} aria-busy={loading}>
                Refresh
              </button>
              <button className="btn btn-primary" onClick={() => setOpen(true)}>
                New Recipe
              </button>
            </div>
          </div>
          <RecipeGrid
            recipes={recipes}
            onSelect={(r) => navigate(`/recipes/${r.id}`)}
          />
        </main>
      </div>
      <RecipeFormModal open={open} onClose={() => setOpen(false)} onSave={handleSave} />
    </div>
  );
}
