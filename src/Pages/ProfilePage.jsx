import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Profile.css';
import { useOutletContext } from 'react-router-dom';

const ProfilePage = () => {
  const { userID } = useOutletContext();
  const [userData, setUserData] = useState({
    full_name: '',
    email: '',
    profile_photo: ''
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/fetch-profile/${userID}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        setUserData(response.data.user);
      } catch (error) {
        setError('Error fetching profile data');
      }
    };

    fetchUserData();
  }, [userID]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('full_name', userData.full_name || '');
    formData.append('email', userData.email || '');

    if (file) {
      formData.append('profile_photo', file);
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/users/profile`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(response.data.message);
    } catch (error) {
      setError('Error updating profile.');
    }
  };

  return (
    <div className="profile-container">
      <h2>Edit Profile</h2>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="profile-picture-container">
          <div className="profile-picture-preview">
            {file ? (
              <img src={URL.createObjectURL(file)} alt="Profile" className="profile-picture" />
            ) : userData.profile_photo ? (
              <img src={userData.profile_photo} alt="Profile" className="profile-picture" />
            ) : (
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userData.full_name || "User")}&background=random&color=ffffff&size=100`}
                alt="Default Avatar"
                className="profile-picture"
              />
            )}
          </div>
          <label htmlFor="fileInput" className="file-label">Change Picture</label>
          <input type="file" id="fileInput" onChange={handleFileChange} className="file-input" />
        </div>

        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            name="full_name"
            value={userData.full_name || ''}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email || ''}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;
