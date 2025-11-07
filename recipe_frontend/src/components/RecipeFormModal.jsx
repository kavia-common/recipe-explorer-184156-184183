import React, { useEffect, useState } from 'react';
import '../theme.css';

/**
 * PUBLIC_INTERFACE
 * RecipeFormModal - accessible modal for creating/editing a recipe.
 */
export default function RecipeFormModal({ open, initial, onClose, onSave }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [tags, setTags] = useState((initial?.tags || []).join(', '));

  useEffect(() => {
    setTitle(initial?.title || '');
    setDescription(initial?.description || '');
    setTags((initial?.tags || []).join(', '));
  }, [initial, open]);

  if (!open) return null;

  const handleSave = () => {
    const payload = {
      ...initial,
      title: title.trim(),
      description: description.trim(),
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    };
    onSave?.(payload);
  };

  return (
    <div role="dialog" aria-modal="true" aria-label="Recipe form" style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)',
      display: 'grid', placeItems: 'center', padding: '1rem', zIndex: 100
    }}>
      <div className="card" style={{ width: '100%', maxWidth: 560 }}>
        <div style={{ padding: '1rem 1rem 0 1rem' }}>
          <h2 style={{ margin: 0 }}>{initial?.id ? 'Edit Recipe' : 'New Recipe'}</h2>
        </div>
        <div style={{ padding: '1rem', display: 'grid', gap: '0.75rem' }}>
          <div>
            <label htmlFor="title">Title</label>
            <input id="title" className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label htmlFor="desc">Description</label>
            <textarea id="desc" rows="3" className="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <label htmlFor="tags">Tags (comma separated)</label>
            <input id="tags" className="input" value={tags} onChange={(e) => setTags(e.target.value)} />
          </div>
        </div>
        <div style={{ padding: '0.75rem 1rem 1rem 1rem', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
