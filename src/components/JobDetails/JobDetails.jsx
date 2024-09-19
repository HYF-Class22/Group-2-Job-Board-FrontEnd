import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Api from "./../../Api";
import "./JobDetails.css";


const JobDetails = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const [job, setJob] = useState({}); // State to hold job details
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to handle errors

  const navigate = useNavigate();
  // Fetch job details when the component mounts
  const fetchJobDetails = async (jobId) => {
    try {
      const data = await Api.getMyJobsDetails(jobId);
      setJob(data[0]);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch job details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(id){
      fetchJobDetails(id);
    }
  }, [id]);

  // Display loading message while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error message if there was an error fetching data
  if (error) {
    return <div>Error: {error}</div>;
  }

  const updateHandler=(jobId)=>{
    navigate(`/UpdateJobProfileForm/${jobId}`, { replace: true });
  }
  const backHandler=()=>{
    navigate(`/myjobs`, { replace: true });
  }
  const deleteHandler=(jobId)=>{
    navigate(`/delete/${jobId}`, { replace: true });
  }
  // Display job details if data is fetched successfully
  return (

    <div className="job-details">
      <h1 className='heading'>Job Application Tracker</h1>
      <h2 className="title">Job Details</h2>
      <div className="job-details-container">
        <p><strong>Company Name:</strong> {job.companyName}</p>
        <p><strong>Interview Date:</strong> {job.interviewDate}</p>
        <p><strong>Job Role:</strong> {job.jobRole}</p>
        <p><strong>Salary:</strong> {job.salary}</p>
        <p><strong>Status:</strong> {job.status}</p>
        <p><strong>Attachment:</strong> {job.attachment}</p>
        <p><strong>Job URL:</strong>{" "}
          <a href={job.jobUrl} target="_blank" rel="noopener noreferrer"> {job.jobUrl}</a>
        </p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Notes:</strong> {job.notes}</p>
      </div>
      <button className='update' onClick={() => updateHandler()}>Update</button>
      <button className='back' onClick ={()=>backHandler(id)} >Back</button>
      <button className='delete' onClick={() => deleteHandler()}>Delete</button>
    </div>
  );
};

export default JobDetails;
