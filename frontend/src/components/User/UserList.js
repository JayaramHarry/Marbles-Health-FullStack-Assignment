import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsArrowRight } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";
import '../../styles.css';

const UserList = ({ search }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Define an array of background colors
  const colors = ['#ad8cce', '#f29bda', '#76c5c1', '#7dd76c', '#84daad', '#6689cc', '#d568af'];

  const fetchUsers = async (page = 1, search = '') => {
    setLoading(true);
    try {
      const limitPerPage = 3; // Number of users per page
      const response = await axios.get(`https://marbles-health-fullstack-assignment.onrender.com/api/users`, {
        params: { page, limit: limitPerPage, search }
      });
      const sortedUsers = response.data.users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setUsers(sortedUsers);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page, search);
  }, [page, search]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="user-cards">
        {users.map((user, index) => (
                      <div key={user._id} className="user-card">
                      {/* Apply background color based on initials */}
                      <div className="user-logo" style={{ backgroundColor: getRandomColor() }}>
                        {getInitials(user.name)}
                      </div>
                      <div className="user-info-container">
                        <div className="user-info">
                          <Link to={`/user/${user._id}`} className="user-name">
                            {user.name}
                          </Link>
                          <p className="user-created-at">{new Date(user.createdAt).toLocaleString()}</p>
                        </div>
                        <p className="user-description">{user.description.substring(0, 50)}...</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pagination">
                  <div onClick={() => handlePageChange(page > 1 ? page - 1 : 1)} disabled={page === 1}>
                    <BsArrowLeft />
                  </div>
                  <span>{page}/{totalPages}</span>
                  <div onClick={() => handlePageChange(page < totalPages ? page + 1 : totalPages)} disabled={page === totalPages}>
                    <BsArrowRight />
                  </div>
                </div>
              </div>
            );
          };
          
          export default UserList;
          
         
