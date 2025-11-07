import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RecipeListPage from './pages/RecipeListPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import AuthPage from './pages/AuthPage';

/**
 * PUBLIC_INTERFACE
 * AppRoutes - defines application routes.
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RecipeListPage />} />
      <Route path="/recipes/:id" element={<RecipeDetailPage />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
}
