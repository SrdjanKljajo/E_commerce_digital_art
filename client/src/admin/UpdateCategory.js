import React, { useState, useEffect, useRef } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getCategory, updateCategory } from './apiAdmin';

const UpdateCategory = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    error: '',
    success: '',
    formData: '',
  });

  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  // destructure user and token from localStorage
  const { user, token } = isAuthenticated();

  const { name, error, success } = values;

  const init = categoryId => {
    getCategory(categoryId, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        // populate the state
        setValues({
          ...values,
          name: data.name,
        });
      }
    });
  };

  useEffect(() => {
    init(match.params.categoryId);
  }, []);

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const submitCategoryForm = e => {
    e.preventDefault();
    // update with ? you should send category name otherwise what to update?
    const category = {
      name: name,
    };
    updateCategory(match.params.categoryId, user._id, token, category).then(
      data => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: data.name,
            error: false,
            success: true,
          });
        }
        if (!data.error) {
          timerID = setTimeout(() => {
            window.location = '/admin/categories';
          }, 4000);
        }
      }
    );
  };

  const updateCategoryForm = () => (
    <div>
      <h4 className='text-center mb-5'>Update Category</h4>
      <form className='mb-5' onSubmit={submitCategoryForm}>
        <div className='form-group'>
          <label className='text-muted'>Update Category Name</label>
          <input
            onChange={handleChange('name')}
            type='text'
            className='form-control'
            value={name}
            required
          />
        </div>

        <button type='submit' className='btn btn-dark btn-block'>
          Save Changes
        </button>
      </form>
    </div>
  );

  const showSuccess = () => {
    if (success) {
      return (
        <h4 className='text-success text-center'>Category {name} is updated</h4>
      );
    }
  };

  const showError = () => {
    if (error) {
      return <h4 className='text-danger text-center'>Error, try again</h4>;
    }
  };

  const goBackBTN = () => {
    return (
      <div className='mt-5'>
        <h6>
          <Link
            to='/admin/categories'
            style={{ textDecoration: 'none', color: 'teal' }}
            className=''
          >
            Back to categories
          </Link>
        </h6>
      </div>
    );
  };

  return (
    <Layout
      title={`Hi ${user.name}`}
      description={`This is Update Product Action Page`}
      className='container mb-5'
    >
      <div className='row'>
        <div
          className='container shadow p-4 mt-5'
          style={{ maxWidth: '500px' }}
        >
          {showError()}
          {showSuccess()}
          {updateCategoryForm()}
          {goBackBTN()}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateCategory;
