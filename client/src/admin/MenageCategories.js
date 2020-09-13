import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getCategories, deleteCategory } from './apiAdmin';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const destroy = categoryId => {
    deleteCategory(categoryId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadCategories();
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <Layout
      title='Manage Categories'
      description='Perform CRUD on categories'
      className='container'
    >
      <div className='row'>
        <div className='col-12 mx-auto' style={{ maxWidth: '700px' }}>
          <h2 className='text-center'>Total {categories.length} categories</h2>
          <hr />
          <ul className='list-group'>
            {categories.map((c, i) => (
              <li
                key={i}
                className='list-group-item d-flex justify-content-between align-items-center'
              >
                <strong>{c.name}</strong>
                <div className='float-right'>
                  <Link to={`/admin/category/update/${c._id}`}>
                    <span className='badge badge-warning badge-pill mr-4'>
                      Update
                    </span>
                  </Link>
                  <span
                    onClick={() => destroy(c._id)}
                    style={{ cursor: 'pointer' }}
                    className='badge badge-danger badge-pill'
                  >
                    Delete
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <br />
        </div>
      </div>
    </Layout>
  );
};

export default ManageCategories;
