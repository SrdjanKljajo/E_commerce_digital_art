import React from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className='card shadow'>
        <h4 className='card-header'>Admin Links</h4>
        <ul className='list-group' style={{ fontSize: '1.3rem' }}>
          <li className='list-group-item'>
            <Link className='nav-link text-danger' to='/create/category'>
              Create Category
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link text-danger' to='/create/product'>
              Create Product
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link text-danger' to='/admin/orders'>
              View Orders
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link text-danger' to='/admin/products'>
              Manage Products
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link text-danger' to='/admin/categories'>
              Manage Categories
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link text-danger' to={`/profile/${_id}`}>
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className='card mb-5 shadow'>
        <h3 className='card-header'>User Information</h3>
        <ul className='list-group' style={{ fontSize: '1.5rem' }}>
          <li className='list-group-item'>Name: {name}</li>
          <li className='list-group-item'>Email: {email}</li>
          <li className='list-group-item'>
            Role: {role === 1 ? 'Admin' : 'Registered User'}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title='Dashboard'
      description={`Welcome ${name}!`}
      className='container mt-5'
    >
      <div className='row'>
        <div className='col-md-5'>{adminLinks()}</div>
        <div className='col-md-7'>{adminInfo()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
