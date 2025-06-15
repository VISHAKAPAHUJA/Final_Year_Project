import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

const TalentMatchInterviews = () => {
  const [activeDay, setActiveDay] = useState(10);
  const [countdown, setCountdown] = useState("18:24:35");

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      // For demo purposes, we'll just show a static countdown
      // In a real app, you would calculate the time remaining until each interview
      setCountdown("18:24:35");
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleDayClick = (day) => {
    setActiveDay(day);
    // Here you would typically filter interviews for the selected day
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <Helmet>
        <title>TalentMatch - Interviews</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <style>
          {`
            .status-badge {
              @apply px-3 py-1 rounded-full text-xs font-medium;
            }
            .interview-card:hover {
              transform: translateY(-3px);
              box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
            }
            .tab-active {
              @apply border-blue-500 text-blue-600;
            }
            .countdown-timer {
              @apply text-2xl font-bold text-gray-800;
            }
            .calendar-day {
              @apply w-8 h-8 flex items-center justify-center rounded-full cursor-pointer;
            }
            .calendar-day.active {
              @apply bg-blue-600 text-white;
            }
            .calendar-day.has-event {
              @apply bg-blue-100 text-blue-600;
            }
            .progress-ring__circle {
              transition: stroke-dashoffset 0.35s;
              transform: rotate(-90deg);
              transform-origin: 50% 50%;
            }
            .gradient-bg {
              background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
            }
            .navbar-glass {
              background: rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(10px);
              -webkit-backdrop-filter: blur(10px);
            }
            .float-effect {
              animation: float 6s ease-in-out infinite;
            }
            .pulse {
              animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-5px); }
              100% { transform: translateY(0px); }
            }
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.8; }
            }
            .rotate {
              animation: rotate 8s linear infinite;
            }
            @keyframes rotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .progress-bar {
              @apply w-full bg-gray-200 rounded-full h-2 overflow-hidden;
            }
            .progress-fill {
              @apply h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full;
            }
            .wave {
              position: relative;
              overflow: hidden;
            }
            .wave::after {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: linear-gradient(
                  90deg,
                  transparent,
                  rgba(255, 255, 255, 0.3),
                  transparent
              );
              animation: wave 2s linear infinite;
            }
            @keyframes wave {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
          `}
        </style>
      </Helmet>

      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                <i className="fas fa-calendar-check text-blue-500 mr-2"></i>
                My Interviews
              </h2>
              <p className="text-sm text-gray-500 mt-1">Track and manage your upcoming interviews</p>
            </div>
            <div className="flex space-x-3 mt-4 md:mt-0">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center">
                <i className="fas fa-plus mr-2"></i>
                Schedule New
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-blue-600 font-medium">UPCOMING</p>
                  <h3 className="text-2xl font-bold text-blue-800">3</h3>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-clock text-blue-600"></i>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-green-600 font-medium">COMPLETED</p>
                  <h3 className="text-2xl font-bold text-green-800">5</h3>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-check-circle text-green-600"></i>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-yellow-600 font-medium">RESCHEDULED</p>
                  <h3 className="text-2xl font-bold text-yellow-800">2</h3>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-calendar-alt text-yellow-600"></i>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-purple-600 font-medium">SUCCESS RATE</p>
                  <h3 className="text-2xl font-bold text-purple-800">62%</h3>
                </div>
                <div className="relative w-12 h-12">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#EDE9FE"
                      strokeWidth="3"
                      strokeDasharray="100, 100"
                    />
                    <path
                      className="progress-ring__circle"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="3"
                      strokeDasharray="62, 100"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Interviews Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                <i className="fas fa-calendar-day text-blue-500 mr-2"></i>
                Upcoming Interviews
              </h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select className="text-sm border border-gray-300 rounded-lg px-2 py-1 focus:ring-blue-500 focus:border-blue-500">
                  <option>Date (Soonest)</option>
                  <option>Date (Latest)</option>
                  <option>Company Name</option>
                  <option>Job Title</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Interview Card 1 */}
              <div className="interview-card bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-gray-800">Final Round Interview</h4>
                    <p className="text-sm text-gray-500">TechCorp Inc.</p>
                  </div>
                  <span className="status-badge bg-blue-100 text-blue-800">
                    <i className="fas fa-clock mr-1"></i> Upcoming
                  </span>
                </div>
                
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-video text-blue-500"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Video Call</p>
                    <p className="text-xs text-gray-500">Zoom Meeting</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-user-tie text-purple-500"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Sarah Johnson</p>
                    <p className="text-xs text-gray-500">Hiring Manager</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-calendar-alt text-green-500"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Tomorrow, 10:30 AM</p>
                    <p className="text-xs text-gray-500">Duration: 45 mins</p>
                  </div>
                </div>
                
                <div className="countdown-timer mb-4 text-center">
                  <div className="text-xs text-gray-500 mb-1">Time remaining</div>
                  <div>{countdown}</div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition flex items-center justify-center">
                    <i className="fas fa-video mr-2"></i> Join
                  </button>
                  <button className="px-3 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm rounded-lg transition">
                    <i className="fas fa-ellipsis-h"></i>
                  </button>
                </div>
              </div>

              {/* Interview Card 2 */}
              <div className="interview-card bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-gray-800">Technical Interview</h4>
                    <p className="text-sm text-gray-500">EcoStart</p>
                  </div>
                  <span className="status-badge bg-yellow-100 text-yellow-800">
                    <i className="fas fa-exclamation-circle mr-1"></i> Prep Needed
                  </span>
                </div>
                
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-laptop-code text-orange-500"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Coding Test</p>
                    <p className="text-xs text-gray-500">HackerRank</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-users text-blue-500"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Engineering Team</p>
                    <p className="text-xs text-gray-500">3 interviewers</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-calendar-alt text-green-500"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Fri, Jun 10, 2:00 PM</p>
                    <p className="text-xs text-gray-500">Duration: 1 hour</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-1">Preparation progress</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded-lg transition flex items-center justify-center">
                    <i className="fas fa-book mr-2"></i> Prepare
                  </button>
                  <button className="px-3 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm rounded-lg transition">
                    <i className="fas fa-ellipsis-h"></i>
                  </button>
                </div>
              </div>

              {/* Interview Card 3 */}
              <div className="interview-card bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-gray-800">On-site Interview</h4>
                    <p className="text-sm text-gray-500">ShopMega</p>
                  </div>
                  <span className="status-badge bg-green-100 text-green-800">
                    <i className="fas fa-check-circle mr-1"></i> Confirmed
                  </span>
                </div>
                
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-building text-red-500"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">In-person</p>
                    <p className="text-xs text-gray-500">HQ Office</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-user-friends text-purple-500"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Panel Interview</p>
                    <p className="text-xs text-gray-500">5 team members</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-calendar-alt text-green-500"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Mon, Jun 13, 9:00 AM</p>
                    <p className="text-xs text-gray-500">Full day</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-1">Interview materials</div>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">Portfolio</span>
                    <span className="px-2 py-1 bg-green-50 text-green-600 text-xs rounded-full">References</span>
                    <span className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-full">Case Study</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition flex items-center justify-center">
                    <i className="fas fa-directions mr-2"></i> Directions
                  </button>
                  <button className="px-3 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm rounded-lg transition">
                    <i className="fas fa-ellipsis-h"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              <i className="fas fa-calendar-alt text-blue-500 mr-2"></i>
              Interview Calendar
            </h3>
            
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
                <div className="py-2 text-center text-xs font-medium text-gray-500">Sun</div>
                <div className="py-2 text-center text-xs font-medium text-gray-500">Mon</div>
                <div className="py-2 text-center text-xs font-medium text-gray-500">Tue</div>
                <div className="py-2 text-center text-xs font-medium text-gray-500">Wed</div>
                <div className="py-2 text-center text-xs font-medium text-gray-500">Thu</div>
                <div className="py-2 text-center text-xs font-medium text-gray-500">Fri</div>
                <div className="py-2 text-center text-xs font-medium text-gray-500">Sat</div>
              </div>
              
              <div className="grid grid-cols-7 gap-1 p-2">
                {/* Previous month days */}
                <div className="h-12 flex items-center justify-center text-gray-300 text-sm">29</div>
                <div className="h-12 flex items-center justify-center text-gray-300 text-sm">30</div>
                <div className="h-12 flex items-center justify-center text-gray-300 text-sm">31</div>
                
                {/* Current month days */}
                <div className="h-12 flex items-center justify-center text-sm">1</div>
                <div className="h-12 flex items-center justify-center text-sm">2</div>
                <div className="h-12 flex items-center justify-center text-sm">3</div>
                <div className="h-12 flex items-center justify-center text-sm">4</div>
                <div className="h-12 flex items-center justify-center text-sm">5</div>
                <div className="h-12 flex items-center justify-center text-sm">6</div>
                <div className="h-12 flex items-center justify-center text-sm">7</div>
                <div className="h-12 flex items-center justify-center text-sm">8</div>
                <div className="h-12 flex items-center justify-center text-sm">9</div>
                <div 
                  className={`h-12 flex items-center justify-center calendar-day ${activeDay === 10 ? 'active' : ''}`}
                  onClick={() => handleDayClick(10)}
                >
                  10
                </div>
                <div className="h-12 flex items-center justify-center text-sm">11</div>
                <div className="h-12 flex items-center justify-center text-sm">12</div>
                <div 
                  className="h-12 flex items-center justify-center calendar-day has-event"
                  onClick={() => handleDayClick(13)}
                >
                  13
                </div>
                <div className="h-12 flex items-center justify-center text-sm">14</div>
                <div className="h-12 flex items-center justify-center text-sm">15</div>
                <div className="h-12 flex items-center justify-center text-sm">16</div>
                <div className="h-12 flex items-center justify-center text-sm">17</div>
                <div className="h-12 flex items-center justify-center text-sm">18</div>
                <div className="h-12 flex items-center justify-center text-sm">19</div>
                <div className="h-12 flex items-center justify-center text-sm">20</div>
                <div 
                  className="h-12 flex items-center justify-center calendar-day has-event"
                  onClick={() => handleDayClick(21)}
                >
                  21
                </div>
                <div className="h-12 flex items-center justify-center text-sm">22</div>
                <div className="h-12 flex items-center justify-center text-sm">23</div>
                <div className="h-12 flex items-center justify-center text-sm">24</div>
                <div className="h-12 flex items-center justify-center text-sm">25</div>
                <div className="h-12 flex items-center justify-center text-sm">26</div>
                <div className="h-12 flex items-center justify-center text-sm">27</div>
                <div className="h-12 flex items-center justify-center text-sm">28</div>
                <div className="h-12 flex items-center justify-center text-sm">29</div>
                <div className="h-12 flex items-center justify-center text-sm">30</div>
                
                {/* Next month days */}
                <div className="h-12 flex items-center justify-center text-gray-300 text-sm">1</div>
                <div className="h-12 flex items-center justify-center text-gray-300 text-sm">2</div>
              </div>
            </div>
          </div>

          {/* Completed Interviews Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              <i className="fas fa-history text-blue-500 mr-2"></i>
              Recent Interviews
            </h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jun 5, 2023</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <i className="fas fa-building text-blue-600"></i>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">TechCorp Inc.</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">UX Designer</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">Technical</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Advanced</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Feedback</button>
                      <button className="text-gray-600 hover:text-gray-900">Details</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 28, 2023</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                            <i className="fas fa-leaf text-green-600"></i>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">EcoStart</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Product Designer</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-full">Cultural Fit</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Pending</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Follow Up</button>
                      <button className="text-gray-600 hover:text-gray-900">Details</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 20, 2023</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                            <i className="fas fa-shopping-cart text-red-600"></i>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">ShopMega</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Senior UX Designer</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 py-1 bg-orange-50 text-orange-600 text-xs rounded-full">Portfolio Review</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Rejected</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Feedback</button>
                      <button className="text-gray-600 hover:text-gray-900">Details</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentMatchInterviews;