import React from "react";
import { NavLink } from 'react-router-dom'; // Import NavLink
import {
  FaUserTie,
  FaHome,
  FaSearch,
  FaFileAlt,
  FaCalendarCheck,
  FaChartLine,
  FaCog,
  FaQuestionCircle,
  FaCheckCircle,
} from "react-icons/fa";

const CandidateSidebar = () => {
  const linkClasses = ({ isActive }) =>
    `menu-item flex items-center space-x-3 p-3 rounded-lg font-medium transition transform hover:translate-x-2 ${
      isActive ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-700'
    }`;

  const iconContainerClasses = ({ isActive }) =>
    `menu-icon w-8 h-8 rounded-full flex items-center justify-center ${
      isActive ? 'bg-blue-100' : 'bg-gray-100'
    }`;

  const iconClasses = ({ isActive }) =>
    `${isActive ? 'text-blue-600' : 'text-gray-600'}`;

  return (
    <aside className="lg:w-1/4">
      <div className="bg-white rounded-xl shadow-xl p-6 sticky top-8 border border-gray-100 transform transition hover:shadow-2xl">
        {/* Profile Summary */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mb-4 shadow-lg relative overflow-hidden">
            <span className="text-white text-2xl font-bold z-10">JD</span>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">John Doe</h3>
          <p className="text-sm text-gray-500">Senior UX Designer</p>
          <div className="mt-2 flex space-x-2">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-1 animate-pulse"></span>
              Active
            </span>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
              <FaCheckCircle className="text-xs mr-1" />
              Verified
            </span>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Profile Strength
            </span>
            <span className="text-sm font-medium text-blue-600">75%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill wave" style={{ width: "75%" }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Complete your profile to increase visibility
          </p>
        </div>

        {/* Navigation */}
        <h2 className="text-xl font-bold mb-6 text-blue-600 flex items-center">
          <FaUserTie className="mr-2" />
          <span>Candidate Dashboard</span>
        </h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/candidate_dashboard"
                className={linkClasses}
                end // Use 'end' prop for exact match on the dashboard route
              >
                <div className={iconContainerClasses}>
                  <FaHome className={iconClasses} />
                </div>
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/candidate_dashboard/find-jobs"
                className={linkClasses}
              >
                <div className={iconContainerClasses}>
                  <FaSearch className={iconClasses} />
                </div>
                <span>Find Jobs</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/candidate_dashboard/applications"
                className={linkClasses}
              >
                <div className={iconContainerClasses}>
                  <FaFileAlt className={iconClasses} />
                </div>
                <span>Applications</span>
                <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                  5
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/candidate_dashboard/interviews"
                className={linkClasses}
              >
                <div className={iconContainerClasses}>
                  <FaCalendarCheck className={iconClasses} />
                </div>
                <span>Interviews</span>
                <span className="ml-auto bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  2
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/candidate_dashboard/analytics"
                className={linkClasses}
              >
                <div className={iconContainerClasses}>
                  <FaChartLine className={iconClasses} />
                </div>
                <span>Analytics</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/candidate_dashboard/settings"
                className={linkClasses}
              >
                <div className={iconContainerClasses}>
                  <FaCog className={iconClasses} />
                </div>
                <span>Settings</span>
              </NavLink>
            </li>
          </ul>

          {/* Help Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 p-4 rounded-lg transform hover:scale-[1.02] transition">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center rotate">
                  <FaQuestionCircle className="text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800">
                    Need Help?
                  </h4>
                  <p className="text-xs text-gray-500">
                    Contact our support team
                  </p>
                </div>
              </div>
              <button className="mt-3 w-full py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition transform hover:-translate-y-1">
                Get Support
              </button>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default CandidateSidebar;