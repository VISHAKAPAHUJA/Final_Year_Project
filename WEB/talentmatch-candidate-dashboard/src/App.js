import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/dashboard.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import FindJobs from './components/FindJobs';
import TalentMatchApplications from './components/TalentMatchApplications';
import TalentMatchInterviews from './components/TalentMatchInterviews';
import { setupAnimations } from './utils/animations';

function App() {
  useEffect(() => {
    setupAnimations();
  }, []);

  return (
    <div className="bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar />
          <main className="lg:w-[1200px]"> {/* Fixed specific width */}
            <Routes>
              <Route path="/candidate_dashboard" element={<MainContent />} />
              <Route path="/find-jobs" element={<FindJobs />} />
              <Route path="/applications" element={<TalentMatchApplications />} />
              <Route path="/interviews" element={<TalentMatchInterviews />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;