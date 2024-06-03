import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles.css';

// Validation schema using Yup
const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  dob: yup.date().required('Date of Birth is required'),
  contact: yup.string().required('Contact is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  description: yup.string().required('Description is required')
});

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/api/users/${id}`)
        .then(response => {
          const user = response.data;
          setValue('name', user.name);
          setValue('dob', user.dob.split('T')[0]);
          setValue('contact', user.contact);
          setValue('email', user.email);
          setValue('description', user.description);
        })
        .catch(error => console.error(error));
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      if (id) {
        await axios.put(`http://localhost:3000/api/users/${id}`, data);
      } else {
        await axios.post('http://localhost:3000/api/users', data);
      }
      reset();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? 'Edit User' : 'New User'}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register('name')} placeholder="Name" />
        {errors.name && <p className="error">{errors.name.message}</p>}

        <input type="date" {...register('dob')} />
        {errors.dob && <p className="error">{errors.dob.message}</p>}

        <input type="text" {...register('contact')} placeholder="Contact" />
        {errors.contact && <p className="error">{errors.contact.message}</p>}

        <input type="email" {...register('email')} placeholder="Email" />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <textarea {...register('description')} placeholder="Description"></textarea>
        {errors.description && <p className="error">{errors.description.message}</p>}

        <div className="form-actions">
          <button type="button" className="back-button" onClick={() => navigate('/')}>Back</button>
          <button type="submit" className='button'>Save</button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
