import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddTutorial from './components/AddTutorial';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import TutorialDetail from './components/TutorialDetail';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import TutorialsPage from './pages/TutorialsPage';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tutorials"
          element={
            <ProtectedRoute>
              <TutorialsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-tutorial"
          element={
            <ProtectedRoute>
              <AddTutorial />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tutorial/:id"
          element={
            <ProtectedRoute>
              <TutorialDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
