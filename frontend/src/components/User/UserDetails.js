import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BsPencil, BsTrash } from "react-icons/bs";
import axios from 'axios';
import { format } from 'date-fns';

import '../../styles.css';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${id}`);
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  // Format the date of birth using date-fns library
  const formattedDateOfBirth = format(new Date(user.dob), 'yyyy-MM-dd');

  return (
    <>
      <div className="user-detail">
        <h2>{user.name}</h2>
        <p><strong>Date of Birth:</strong> {formattedDateOfBirth}</p>
        <p><strong>Contact:</strong> {user.contact}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Description:</strong> {user.description}</p>
        <div className="user-details-page">
          <Link className='edit-icon' to={`/edit/${user._id}`}><BsPencil/></Link>
          <BsTrash className='delete-icon' onClick={handleDelete}/>
        </div>
      </div>
      <button onClick={() => navigate('/')} className="button back-button">Back</button>
    </>
  );
};

export default UserDetail;
