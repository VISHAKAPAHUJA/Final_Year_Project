import React, { useState, useEffect } from 'react';
import '../../styles/findJobs.css';
import { 
  FaMoon, FaSun, FaSearch, FaMapMarkerAlt, 
  FaBuilding, FaLaptopCode, FaServer, FaMobileAlt,
  FaClock, FaBookmark, FaChevronLeft, FaChevronRight
} from 'react-icons/fa';

const FindJobs = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setDarkMode(true);
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  // Toggle filter pill
  const toggleFilter = (filterName) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };

  // Toggle bookmark
  const toggleBookmark = (jobId) => {
    if (bookmarkedJobs.includes(jobId)) {
      setBookmarkedJobs(bookmarkedJobs.filter(id => id !== jobId));
    } else {
      setBookmarkedJobs([...bookmarkedJobs, jobId]);
    }
  };

  // Handle apply button click
  const handleApply = (jobTitle) => {
    alert(`Application submitted for: ${jobTitle}`);
  };

  // Job data
  const jobs = [
    {
      id: 1,
      title: "Senior UX Designer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      salary: "$120K - $150K",
      description: "We're looking for an experienced UX Designer to join our product team. You'll be responsible for creating intuitive user experiences for our SaaS platform.",
      skills: ["UI/UX", "Figma", "Prototyping", "User Research"],
      posted: "2 days ago",
      type: "Full-time",
      urgent: true,
      featured: false,
      icon: <FaBuilding className="text-indigo-600 dark:text-indigo-300 text-2xl" />
    },
    {
      id: 2,
      title: "Frontend Developer (React)",
      company: "DigitalAgency",
      location: "Remote",
      salary: "$90K - $120K",
      description: "Join our team as a Frontend Developer specializing in React. You'll work on client projects building responsive web applications with modern JavaScript frameworks.",
      skills: ["React", "TypeScript", "Redux", "CSS"],
      posted: "1 week ago",
      type: "Full-time",
      urgent: false,
      featured: true,
      icon: <FaLaptopCode className="text-blue-600 dark:text-blue-300 text-2xl" />
    },
    {
      id: 3,
      title: "Backend Engineer (Node.js)",
      company: "CloudTech",
      location: "New York, NY",
      salary: "$110K - $140K",
      description: "We're seeking a skilled Backend Engineer to develop and maintain our API services. Experience with microservices architecture and cloud platforms is a plus.",
      skills: ["Node.js", "MongoDB", "AWS", "Docker"],
      posted: "3 days ago",
      type: "Full-time",
      urgent: false,
      featured: false,
      icon: <FaServer className="text-purple-600 dark:text-purple-300 text-2xl" />
    },
    {
      id: 4,
      title: "Mobile Developer (React Native)",
      company: "AppVenture",
      location: "Austin, TX",
      salary: "$95K - $125K",
      description: "Looking for a React Native developer to join our mobile team. You'll be building cross-platform mobile applications for both iOS and Android.",
      skills: ["React Native", "JavaScript", "iOS", "Android"],
      posted: "5 days ago",
      type: "Full-time",
      urgent: false,
      featured: false,
      icon: <FaMobileAlt className="text-green-600 dark:text-green-300 text-2xl" />
    }
  ];

  return (
    <div className={`bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-200 min-h-screen`}>
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 mt-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">Filter Jobs</h2>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">Keywords</label>
                <div className="relative">
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                    placeholder="Job title, skills, etc."
                  />
                  <button className="absolute right-3 top-2.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    <FaSearch />
                  </button>
                </div>
              </div>
              
              {/* Location */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">Location</label>
                <div className="relative">
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                    placeholder="City, state, or remote"
                  />
                  <button className="absolute right-3 top-2.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    <FaMapMarkerAlt />
                  </button>
                </div>
              </div>
              
              {/* Job Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">Job Type</label>
                <div className="flex flex-wrap gap-2">
                  {['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'].map(type => (
                    <button 
                      key={type}
                      onClick={() => toggleFilter(type)}
                      className={`filter-pill px-3 py-1 rounded-full border ${activeFilter === type ? 'bg-indigo-100 dark:bg-indigo-900 border-indigo-500' : 'border-gray-300 dark:border-gray-600'} text-sm`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Experience Level */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">Experience Level</label>
                <div className="flex flex-wrap gap-2">
                  {['Entry Level', 'Mid Level', 'Senior Level'].map(level => (
                    <button 
                      key={level}
                      onClick={() => toggleFilter(level)}
                      className={`filter-pill px-3 py-1 rounded-full border ${activeFilter === level ? 'bg-indigo-100 dark:bg-indigo-900 border-indigo-500' : 'border-gray-300 dark:border-gray-600'} text-sm`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Salary Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">Salary Range</label>
                <input 
                  type="range" 
                  min="0" 
                  max="200000" 
                  value="100000" 
                  step="10000" 
                  className="w-full salary-range"
                />
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <span>$0</span>
                  <span>$100K+</span>
                </div>
              </div>
              
              {/* Skills */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">Skills</label>
                <div className="flex flex-wrap gap-2">
                  {['React', 'JavaScript', 'Node.js', 'UI/UX', 'Python'].map(skill => (
                    <button 
                      key={skill}
                      onClick={() => toggleFilter(skill)}
                      className={`filter-pill px-3 py-1 rounded-full border ${activeFilter === skill ? 'bg-indigo-100 dark:bg-indigo-900 border-indigo-500' : 'border-gray-300 dark:border-gray-600'} text-sm`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
              
              <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                Apply Filters
              </button>
            </div>
          </div>
          
          {/* Job Listings */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">1,245 Jobs Available</h1>
              <div className="flex items-center">
                <span className="text-sm mr-2 dark:text-gray-300">Sort by:</span>
                <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  <option>Most Relevant</option>
                  <option>Newest</option>
                  <option>Highest Salary</option>
                  <option>Most Applied</option>
                </select>
              </div>
            </div>
            
            {/* Job Cards */}
            <div className="space-y-4">
              {jobs.map(job => (
                <div 
                  key={job.id}
                  className="job-card bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 transition duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex flex-col md:flex-row md:items-start">
                    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                      <div className={`w-16 h-16 rounded-lg ${job.icon.props.className.includes('indigo') ? 'bg-indigo-100 dark:bg-indigo-900' : 
                                      job.icon.props.className.includes('blue') ? 'bg-blue-100 dark:bg-blue-900' :
                                      job.icon.props.className.includes('purple') ? 'bg-purple-100 dark:bg-purple-900' :
                                      'bg-green-100 dark:bg-green-900'} flex items-center justify-center`}>
                        {job.icon}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{job.title}</h3>
                          <div className="flex items-center mt-1 space-x-4">
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              <FaBuilding className="mr-1 inline" /> {job.company}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              <FaMapMarkerAlt className="mr-1 inline" /> {job.location}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                            {job.salary}
                          </span>
                        </div>
                      </div>
                      <p className="mt-3 text-gray-600 dark:text-gray-400">{job.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {job.skills.map(skill => (
                          <span 
                            key={skill} 
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            <FaClock className="mr-1 inline" /> {job.posted}
                          </span>
                          {job.urgent && (
                            <span className="urgent-badge px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-xs font-medium">
                              Urgent Hiring
                            </span>
                          )}
                          {job.featured && (
                            <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-xs font-medium">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => toggleBookmark(job.id)}
                            className={`bookmark-btn p-2 ${bookmarkedJobs.includes(job.id) ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'} hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full`}
                          >
                            {bookmarkedJobs.includes(job.id) ? (
                              <FaBookmark className="fas" />
                            ) : (
                              <FaBookmark className="far" />
                            )}
                          </button>
                          <button 
                            onClick={() => handleApply(job.title)}
                            className="apply-btn px-4 py-2 text-white rounded-lg transition bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <nav className="inline-flex rounded-md shadow">
                <ul className="flex">
                  <li>
                    <button 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className="pagination-btn px-3 py-1 rounded-l-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <FaChevronLeft />
                    </button>
                  </li>
                  {[1, 2, 3, 4].map(page => (
                    <li key={page}>
                      <button 
                        onClick={() => setCurrentPage(page)}
                        className={`pagination-btn px-3 py-1 border-t border-b border-gray-300 dark:border-gray-600 ${currentPage === page ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                      >
                        {page}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button 
                      onClick={() => setCurrentPage(Math.min(4, currentPage + 1))}
                      className="pagination-btn px-3 py-1 rounded-r-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <FaChevronRight />
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindJobs;