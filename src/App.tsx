import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import PrivateRoute from './utils/PrivateRoute';

const App: React.FC = () => {
  return (
    <div className='font-stabil-grotesk no-scrollbar'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/signIn' element={<SignInPage />} />
          <Route
            path='/dashboard'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
