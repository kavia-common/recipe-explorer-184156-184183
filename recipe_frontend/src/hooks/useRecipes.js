import { useCallback, useEffect, useState } from 'react';
import { api } from '../api/client';

/**
 * PUBLIC_INTERFACE
 * useRecipes - fetch and manage recipes with filters.
 */
export function useRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState({ query: '', tag: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const list = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters.query) params.set('q', filters.query);
      if (filters.tag) params.set('tag', filters.tag);
      const qs = params.toString() ? `?${params.toString()}` : '';
      const data = await api.get(`/recipes${qs}`);
      setRecipes(Array.isArray(data) ? data : data?.items || []);
    } catch (e) {
      setError(e);
      // Provide fallback mock for development
      setRecipes([
        { id: 1, title: 'Pasta Primavera', description: 'Fresh veggies with pasta.', tags: ['vegan', 'quick'] },
        { id: 2, title: 'Grilled Salmon', description: 'Citrus glaze and herbs.', tags: ['seafood'] },
        { id: 3, title: 'Avocado Toast', description: 'Simple and delicious.', tags: ['breakfast', 'vegan'] },
      ]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    list();
  }, [list]);

  const get = useCallback(async (id) => {
    try {
      const data = await api.get(`/recipes/${id}`);
      return data;
    } catch {
      // fallback to locally found
      return recipes.find(r => String(r.id) === String(id)) || null;
    }
  }, [recipes]);

  const save = useCallback(async (recipe) => {
    if (recipe.id) {
      return api.put(`/recipes/${recipe.id}`, recipe).catch(() => recipe);
    }
    return api.post('/recipes', recipe).catch(() => ({ ...recipe, id: Date.now() }));
  }, []);

  return { recipes, filters, setFilters, loading, error, list, get, save };
}
