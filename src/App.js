import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddTutorial from './components/AddTutorial';
import TutorialDetail from './components/TutorialDetail';
import DashboardPage from './pages/DashboardPage';
import TutorialsPage from './pages/TutorialsPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          {/* Define routes for each page */}
          <Route path="/" element={<DashboardPage />} />
          <Route path="/tutorials" element={<TutorialsPage />} />
          <Route path="/add-tutorial" element={<AddTutorial />} />
          <Route path="/tutorial/:id" element={<TutorialDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
