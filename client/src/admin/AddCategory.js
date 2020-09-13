import React, { useState, useRef, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createCategory } from './apiAdmin';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  // destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const handleChange = e => {
    setError('');
    setName(e.target.value);
  };

  const clickSubmit = e => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    // make request to api to create category
    createCategory(user._id, token, { name }).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setError('');
        setSuccess(true);
      }
      if (!data.error) {
        timerID = setTimeout(() => {
          window.location = '/shop';
        }, 3000);
      }
    });
  };

  const newCategoryFom = () => (
    <form onSubmit={clickSubmit}>
      <h4 className='text-center mb-5'>Create category</h4>
      <div className='form-group'>
        <label className='text-muted'>Insert Category Name</label>
        <input
          type='text'
          className='form-control'
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <button className='btn btn-dark btn-block'>Create Category</button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return (
        <h4 className='text-success text-center'>Category {name} is created</h4>
      );
    }
  };

  const showError = () => {
    if (error) {
      return (
        <h4 className='text-success text-center'>Category should be unique</h4>
      );
    }
  };

  const goBack = () => (
    <div className='mt-5'>
      <h6>
        <Link
          to='/admin/dashboard'
          style={{ textDecoration: 'none', color: 'teal' }}
          className=''
        >
          Back to Dashboard
        </Link>
      </h6>
    </div>
  );

  return (
    <Layout
      title='Add a new category'
      description={`Welcome ${user.name}, ready to add a new category?`}
      className='container'
    >
      <div className='row'>
        <div
          className='container shadow p-4 mt-5'
          style={{ maxWidth: '500px' }}
        >
          {showSuccess()}
          {showError()}
          {newCategoryFom()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
