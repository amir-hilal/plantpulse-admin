import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import TutorialsPage from './pages/TutorialsPage';
import AddTutorial from './components/AddTutorial';
import TutorialDetail from './components/TutorialDetail';

function App() {
  return (
    <Router>
      <div className="App">
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
