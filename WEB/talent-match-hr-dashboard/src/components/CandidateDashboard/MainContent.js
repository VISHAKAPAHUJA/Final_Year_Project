import React, { useState, useEffect, useRef } from "react";
import {
  FaPlus,
  FaBuilding,
  FaGlobe,
  FaLaptopCode,
  FaFileAlt,
  FaCalendarCheck,
  FaBookmark,
  FaEye,
  FaEllipsisV,
  FaCheck,
  FaClock,
  FaTimes,
  FaRobot,
  FaLightbulb,
  FaBullseye,
  FaMapMarkerAlt,
  FaDollarSign,
  FaCalendarAlt,
  FaBriefcase,
} from "react-icons/fa";

const MainContent = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("recent");
  const [selectedFiles, setSelectedFiles] = useState({}); // Track files per job
  const [currentApplyingJob, setCurrentApplyingJob] = useState(null); // Track which job is being applied to
  const [isApplying, setIsApplying] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
    fetchApplications();
  }, []);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success", // 'success' or 'error'
  });

  const handleFileChange = (e, jobId) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFiles((prev) => ({
        ...prev,
        [jobId]: file,
      }));
    } else {
      alert("Please select a PDF file");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  const handleJobApplication = async (job) => {
    const fileForJob = selectedFiles[job._id];

    if (!fileForJob) {
      setCurrentApplyingJob(job._id);
      fileInputRef.current.click();
      return;
    }

    setIsApplying(true);

    try {
      const formData = new FormData();
      formData.append("cv", fileForJob);
      formData.append("jobId", job._id);

      // Get token if available
      const token = localStorage.getItem("token");
      const headers = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(
        "http://localhost:5000/api/applications/apply",
        {
          method: "POST",
          body: formData,
          headers: headers,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Application failed");
      }

      // Update both localStorage AND backend state
      const newApplication = {
        _id: result.application._id, // Use the ID from backend
        title: job.title,
        company: job.company || "Unknown Company",
        status: "pending",
        appliedDate: new Date().toLocaleDateString(),
        location: job.location || "Remote",
        salary: job.salary || "Not specified",
        skills: job.skills || [],
        jobId: job._id,
      };

      // 1. Update localStorage
      const existingApplications =
        JSON.parse(localStorage.getItem("jobApplications")) || [];
      const updatedApplications = [...existingApplications, newApplication];
      localStorage.setItem(
        "jobApplications",
        JSON.stringify(updatedApplications)
      );

      // 2. Trigger refresh of applications from backend
      await fetchApplications();

      setToast({
        show: true,
        message: `✅ Applied to ${job.title} successfully!`,
        type: "success",
      });

      // Clear selection
      setSelectedFiles((prev) => {
        const newFiles = { ...prev };
        delete newFiles[job._id];
        return newFiles;
      });
      fileInputRef.current.value = "";
    } catch (error) {
      setToast({
        show: true,
        message: `❌ Error: ${error.message}`,
        type: "error",
      });
    } finally {
      setIsApplying(false);
      setCurrentApplyingJob(null);
    }
  };

  // Updated fetchApplications function
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Add this inside your fetchApplications function after getting the data:
  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch("http://localhost:5000/api/applications", {
        headers: headers,
      });

      if (!response.ok) {
        // If unauthorized, fall back to localStorage
        if (response.status === 401) {
          const localApps =
            JSON.parse(localStorage.getItem("jobApplications")) || [];
          setAppliedJobs(localApps.map((app) => app.jobId)); // Track job IDs
          return localApps;
        }
        throw new Error("Failed to fetch applications");
      }

      const data = await response.json();
      setAppliedJobs(data.applications.map((app) => app.jobId)); // Track job IDs
      return data.applications || [];
    } catch (error) {
      console.error("Error fetching applications:", error);
      // Fall back to localStorage if backend fails
      const localApps =
        JSON.parse(localStorage.getItem("jobApplications")) || [];
      setAppliedJobs(localApps.map((app) => app.jobId)); // Track job IDs
      return localApps;
    }
  };
  // Update the file input element to use the current applying job
  const handleFileInputChange = (e) => {
    if (!currentApplyingJob) return;

    const file = e.target.files[0];
    if (file?.type === "application/pdf") {
      setSelectedFiles((prev) => ({ ...prev, [currentApplyingJob]: file }));
    } else {
      setToast({
        show: true,
        message: "Please select a PDF file",
        type: "error",
      });
      e.target.value = "";
    }
  };
  const getJobTypeIcon = (type) => {
    if (!type) return <FaBriefcase className="text-blue-600" />;
    const typeLower = type.toLowerCase();
    switch (typeLower) {
      case "remote":
        return <FaGlobe className="text-green-600 text-sm" />;
      case "hybrid":
        return <FaBuilding className="text-yellow-500 text-sm" />;
      case "onsite":
      case "on-site":
        return <FaMapMarkerAlt className="text-red-500 text-sm" />;
      case "full-time":
        return <FaBriefcase className="text-blue-600 text-sm" />;
      case "part-time":
        return <FaClock className="text-purple-500 text-sm" />;
      case "contract":
        return <FaFileAlt className="text-orange-500 text-sm" />;
      default:
        return <FaBriefcase className="text-gray-500 text-sm" />;
    }
  };

  const getCategoryIcon = (category) => {
    if (!category) return <FaBriefcase className="text-blue-600 text-xl" />;
    const categoryLower = category.toLowerCase();
    switch (categoryLower) {
      case "technology":
      case "tech":
        return <FaLaptopCode className="text-blue-600 text-xl" />;
      case "finance":
        return <FaDollarSign className="text-green-600 text-xl" />;
      case "marketing":
        return <FaBullseye className="text-purple-600 text-xl" />;
      case "design":
        return <FaLightbulb className="text-yellow-600 text-xl" />;
      case "education":
        return <FaBookmark className="text-red-600 text-xl" />;
      default:
        return <FaBriefcase className="text-gray-600 text-xl" />;
    }
  };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return "Expired";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day left";
    return `${diffDays} days left`;
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <strong>Error: </strong> {error}
      </div>
    );
  }

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange} // Changed from handleFileChange
        accept="application/pdf"
        style={{ display: "none" }}
      />

      {/* Welcome Banner */}
      <div className="gradient-bg text-white rounded-xl p-6 mb-8 relative overflow-hidden fade-in">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-20 -mb-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Welcome back, Job Seeker!
            </h2>
            <p className="opacity-90">
              Discover {jobs.length} opportunities waiting for you
            </p>
          </div>
          <button className="mt-4 md:mt-0 bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition transform hover:scale-105 active:scale-95 shadow-lg">
            <FaPlus className="mr-2 inline" /> Upload Resume
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: "Total Jobs",
            value: jobs.length,
            icon: <FaFileAlt className="text-blue-600" />,
            bg: "bg-blue-100",
            trend: "↑ 5% from last month",
          },
          {
            title: "Active Jobs",
            value: jobs.filter((job) => job.status === "active").length,
            icon: <FaCalendarCheck className="text-green-600" />,
            bg: "bg-green-100",
            trend: "Currently hiring",
          },
          {
            title: "Categories",
            value: [...new Set(jobs.map((job) => job.category))].length,
            icon: <FaBookmark className="text-indigo-600" />,
            bg: "bg-indigo-100",
            trend: "Various fields",
          },
          {
            title: "Job Types",
            value: [...new Set(jobs.map((job) => job.type))].length,
            icon: <FaEye className="text-purple-600" />,
            bg: "bg-purple-100",
            trend: "Diverse options",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className={`bg-white rounded-xl shadow-lg p-6 card-hover fade-in`}
            style={{ animationDelay: `${0.1 * (index + 1)}s` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div
                className={`w-12 h-12 rounded-full ${stat.bg} flex items-center justify-center shadow-inner`}
              >
                {stat.icon}
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-green-500 font-medium">
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {["recent", "recommended", "saved"].map((tab) => (
            <button
              key={tab}
              className={`py-4 px-1 font-medium ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              } relative transition`}
              onClick={() => setActiveTab(tab)}
            >
              <span className="capitalize">{tab}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 gap-6 mb-8">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition card-hover group"
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-lg bg-blue-50 flex items-center justify-center shadow-inner group-hover:bg-blue-100 transition">
                    {getCategoryIcon(job.category)}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition">
                        {job.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {getJobTypeIcon(job.type)}
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                          {job.type}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center mt-2 gap-3 text-sm text-gray-600">
                      <span className="flex items-center">
                        <FaBuilding className="mr-1.5 opacity-70" />{" "}
                        {job.category}
                      </span>
                      <span className="flex items-center">
                        <FaMapMarkerAlt className="mr-1.5 opacity-70" />{" "}
                        {job.location}
                      </span>
                      {job.salaryRange && (
                        <span className="flex items-center">
                          <FaDollarSign className="mr-1.5 opacity-70" />{" "}
                          {job.salaryRange}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition"
                    aria-label="Save job"
                  >
                    <FaBookmark />
                  </button>
                  <button
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition"
                    aria-label="More options"
                  >
                    <FaEllipsisV />
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-gray-700 line-clamp-2">{job.description}</p>
              </div>

              {job.skills?.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Required Skills:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.slice(0, 5).map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 text-xs px-3 py-1.5 rounded-full hover:bg-gray-200 transition"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 5 && (
                      <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1.5 rounded-full">
                        +{job.skills.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <FaCalendarAlt className="opacity-70" />
                    <span>Deadline: {formatDate(job.applicationDeadline)}</span>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      getDaysRemaining(job.applicationDeadline).includes(
                        "Expired"
                      )
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {getDaysRemaining(job.applicationDeadline)}
                  </span>
                </div>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                    View Details
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center ${
                      appliedJobs.includes(job._id) ||
                      (localStorage.getItem("jobApplications") &&
                        JSON.parse(
                          localStorage.getItem("jobApplications")
                        ).some((app) => app.jobId === job._id))
                        ? "bg-green-600 text-white"
                        : "bg-blue-600 text-white"
                    }`}
                    onClick={() => handleJobApplication(job)}
                    disabled={
                      isApplying ||
                      appliedJobs.includes(job._id) ||
                      (localStorage.getItem("jobApplications") &&
                        JSON.parse(
                          localStorage.getItem("jobApplications")
                        ).some((app) => app.jobId === job._id))
                    }
                  >
                    {isApplying && currentApplyingJob === job._id ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Applying...
                      </>
                    ) : appliedJobs.includes(job._id) ||
                      (localStorage.getItem("jobApplications") &&
                        JSON.parse(
                          localStorage.getItem("jobApplications")
                        ).some((app) => app.jobId === job._id)) ? (
                      <>
                        <FaCheck className="mr-2" /> Applied
                      </>
                    ) : selectedFiles[job._id] ? (
                      `Apply with ${selectedFiles[job._id].name}`
                    ) : (
                      "Apply Now"
                    )}
                  </button>
                </div>
              </div>

              {selectedFiles[job._id] && (
                <div className="mt-2 text-sm text-gray-600 flex items-center">
                  <FaFileAlt className="mr-2 text-blue-500" />
                  {selectedFiles[job._id].name}
                  <button
                    className="ml-2 text-red-500 hover:text-red-700"
                    onClick={() => {
                      setSelectedFiles((prev) => {
                        const newFiles = { ...prev };
                        delete newFiles[job._id];
                        return newFiles;
                      });
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {toast.show && (
        <div
          className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {toast.message}
          <button
            onClick={() => setToast({ ...toast, show: false })}
            className="ml-4"
          >
            <FaTimes />
          </button>
        </div>
      )}

      {/* AI Recommendations Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold flex items-center">
            <FaRobot className="text-blue-600 mr-2 animate-bounce" />
            AI Career Assistant
          </h3>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center transition hover:-translate-y-0.5">
            View All Recommendations
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: <FaLightbulb className="text-blue-600" />,
              title: "Profile Strength",
              description:
                "Complete your profile to increase visibility by 30%",
              action: "Complete Profile",
              color: "blue",
            },
            {
              icon: <FaBullseye className="text-green-600" />,
              title: "Skill Match",
              description: `Your skills match ${
                Math.floor(Math.random() * 30) + 70
              }% of top jobs`,
              action: "View Matches",
              color: "green",
            },
          ].map((rec, index) => (
            <div
              key={index}
              className={`border border-${rec.color}-100 rounded-lg p-4 bg-${rec.color}-50 hover:shadow-md transition`}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`w-10 h-10 rounded-full bg-${rec.color}-100 flex items-center justify-center shadow-inner`}
                >
                  {rec.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{rec.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {rec.description}
                  </p>
                  <button
                    className={`mt-3 text-${rec.color}-600 hover:text-${rec.color}-800 text-sm font-medium flex items-center transition hover:-translate-y-0.5`}
                  >
                    {rec.action}
                    <svg
                      className="w-3 h-3 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
