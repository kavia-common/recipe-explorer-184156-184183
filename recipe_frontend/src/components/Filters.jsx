import React from 'react';
import '../theme.css';

/**
 * PUBLIC_INTERFACE
 * Filters - sidebar filters for search and tags.
 * Props:
 * - query: string
 * - tag: string
 * - onChange: function(partial) to update filters
 */
export default function Filters({ query, tag, onChange }) {
  return (
    <aside className="sidebar" aria-label="Filters">
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        <div>
          <label htmlFor="q">Search</label>
          <input
            id="q"
            className="input"
            value={query}
            onChange={(e) => onChange({ query: e.target.value })}
            placeholder="Search recipes..."
          />
        </div>
        <div>
          <label htmlFor="tag">Tag</label>
          <input
            id="tag"
            className="input"
            value={tag}
            onChange={(e) => onChange({ tag: e.target.value })}
            placeholder="e.g., vegan"
          />
        </div>
      </div>
    </aside>
  );
}
