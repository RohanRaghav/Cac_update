import React, { useState } from 'react';
import axios from 'axios';

const Submission = () => {
  const [selectedFiles, setSelectedFiles] = useState({});

  const handleFileChange = (e, day) => {
    const files = e.target.files;
    setSelectedFiles(prevState => ({ ...prevState, [day]: files[0] }));
  };

  const handleSubmit = async (e, day) => {
    e.preventDefault();
    const file = selectedFiles[day];

    if (!file) {
      console.error('No file selected for upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('day', day);
    // Replace the following example values with actual user data as needed
    formData.append('username', 'exampleUsername');
    formData.append('UID', 'exampleUID');
    formData.append('course', 'exampleCourse');
    formData.append('year', 'exampleYear');

    try {
      const response = await axios.post('http://localhost:3001/upload-assessment', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Assessment submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting assessment:', error);
    }
  };

  return (
    <div className="submission-container">
      <h2>Assessment Submissions</h2>
      <div className="submission-slots">
        {['Day 1', 'Day 2', 'Day 3'].map((day, index) => (
          <div key={index} className="submission-slot">
            <h3>{day} Assessment</h3>
            <form onSubmit={(e) => handleSubmit(e, day)}>
              <label>
                Upload your assessment:
                <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleFileChange(e, day)} />
              </label>
              <button type="submit" className="submit-btn">Submit</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Submission;
