import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaPlusCircle, 
  FaBriefcase, 
  FaUsers, 
  FaChartBar, 
  FaCalendarAlt, 
  FaFileSignature, 
  FaCog, 
  FaQuestionCircle 
} from 'react-icons/fa';

const Sidebar = () => {
  // Function to determine active class for the NavLink wrapper
  const navLinkClass = ({ isActive }) => 
    `menu-item flex items-center space-x-3 p-3 rounded-lg font-medium transition ${
      isActive 
        ? "bg-primary/10 text-primary hover:bg-primary/20"
        : "hover:bg-gray-100 text-gray-700"
    }`;

  // Function to determine active class for the icon container
  const iconContainerClass = ({ isActive }) =>
    `menu-icon w-8 h-8 rounded-full flex items-center justify-center ${
      isActive ? 'bg-primary/20' : 'bg-gray-100' // Use primary colors for active, gray for inactive
    }`;

  // Function to determine active class for the icon itself
  const iconClass = ({ isActive }) =>
    `${isActive ? 'text-primary' : 'text-gray-600'}`; // Use primary colors for active, gray for inactive

  return (
    <aside className="lg:w-1/4">
      <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8 border border-gray-100">
        <h2 className="text-xl font-bold mb-6 text-primary flex items-center">
          <FaUsers className="mr-2" />
          <span>HR Dashboard</span>
        </h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <NavLink 
                to="/hr_dashboard" 
                className={navLinkClass}
                end // Use 'end' for the exact match on the dashboard route
              >
                <div className={iconContainerClass}>
                  <FaHome className={iconClass} />
                </div>
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/hr_dashboard/post-job" className={navLinkClass}>
                <div className={iconContainerClass}>
                  <FaPlusCircle className={iconClass} />
                </div>
                <span>Post New Job</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/hr_dashboard/manage-jobs" className={navLinkClass}>
                <div className={iconContainerClass}>
                  <FaBriefcase className={iconClass} />
                </div>
                <span>Manage Jobs</span>
                <span className="ml-auto bg-primary text-white text-xs px-2 py-1 rounded-full">12</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/hr_dashboard/candidates" className={navLinkClass}>
                <div className={iconContainerClass}>
                  <FaUsers className={iconClass} />
                </div>
                <span>Candidates</span>
                <span className="ml-auto bg-green-500 text-white text-xs px-2 py-1 rounded-full">24</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/hr_dashboard/settings" className={navLinkClass}>
                <div className={iconContainerClass}>
                  <FaCog className={iconClass} />
                </div>
                <span>settings</span>
              </NavLink>
            </li>
          </ul>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-primary/5 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FaQuestionCircle className="text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800">Need Help?</h4>
                  <p className="text-xs text-gray-500">Contact our support team</p>
                </div>
              </div>
              <button className="mt-3 w-full py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition">
                Get Support
              </button>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;