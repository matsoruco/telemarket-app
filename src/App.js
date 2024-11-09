import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Casos from './components/Casos';
import BaseDeConocimiento from './components/BaseDeConocimiento';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/casos" element={<Casos />} />
      <Route path="/conocimiento" element={<BaseDeConocimiento />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
