import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';
import { itemTotal } from './cartHelpers';

const MenuRes = ({ history }) => {
  const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return {
        color: '#ff9900',
      };
    } else {
      return { color: 'white' };
    }
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-dark py-3 shadow-lg'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='#'>
          <strong className='h6 mb-0 font-weight-bold text-white text-uppercase'>
            Rale print
          </strong>
        </a>
        <button
          className='navbar-toggler navbar-toggler-right'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav nav-pills ml-auto'>
            <li className='nav-item'>
              <Link
                className='nav-link'
                style={isActive(history, '/')}
                to='/'
                activeclassname='active'
              >
                Home
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                className='nav-link'
                style={isActive(history, '/shop')}
                to='/shop'
                activeclassname='active'
              >
                Shop
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                className='nav-link'
                style={isActive(history, '/cart')}
                to='/cart'
                activeclassname='active'
              >
                Cart{' '}
                <sup>
                  <small className='cart-badge'>{itemTotal()}</small>
                </sup>
              </Link>
            </li>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <li className='nav-item'>
                <Link
                  className='nav-link'
                  style={isActive(history, '/user/dashboard')}
                  to='/user/dashboard'
                  activeclassname='active'
                >
                  Dashboard
                </Link>
              </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <li className='nav-item'>
                <Link
                  className='nav-link'
                  style={isActive(history, '/admin/dashboard')}
                  to='/admin/dashboard'
                  activeclassname='active'
                >
                  Dashboard
                </Link>
              </li>
            )}

            {!isAuthenticated() && (
              <Fragment>
                <li className='nav-item'>
                  <Link
                    className='nav-link'
                    style={isActive(history, '/signin')}
                    to='/signin'
                    activeclassname='selected'
                  >
                    Signin
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link
                    className='nav-link'
                    style={isActive(history, '/signup')}
                    to='/signup'
                    activeclassname='active'
                  >
                    Signup
                  </Link>
                </li>
              </Fragment>
            )}

            {isAuthenticated() && (
              <li className='nav-item'>
                <Link
                  to='/'
                  className='nav-link'
                  activeclassname='active'
                  style={{ cursor: 'pointer', color: '#ffffff' }}
                  onClick={() =>
                    signout(() => {
                      history.push('/');
                    })
                  }
                >
                  Signout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(MenuRes);
