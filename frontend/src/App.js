import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import UserList from './components/User/UserList';
import UserDetail from './components/User/UserDetails';
import NewUserForm from './components/User/UserForm';
import './styles.css';

const App = () => {
  const [search, setSearch] = useState('');

  const handleSearch = (value) => {
    setSearch(value);
  };

  return (
    <Router>
      <Header onSearch={handleSearch} />
      <div className="container">
        <Routes>
          <Route path="/" element={<UserList search={search} />} />
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="/new" element={<NewUserForm />} />
          <Route path="/edit/:id" element={<NewUserForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
