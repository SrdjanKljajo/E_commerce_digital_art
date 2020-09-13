import React from 'react';
import MenuRes from './MenuRes';
import logo from '../websmartist_logo.jpg';
import '../styles.css';

const Layout = ({
  title = 'Title',
  description = 'Description',
  className,
  children,
}) => (
  <div>
    <div className='jumbotron'>
      <MenuRes />
      <h2 className='container'>{title}</h2>
      <p className='lead container'>{description}</p>
    </div>
    <div className={className}>{children}</div>
    <div className='jumbotron mb-0 text-center ' style={{ marginTop: '180px' }}>
      <footer id='footer' className='pt-2 pb-3'>
        <div className='container-fluid'>
          <div className='row text-light'>
            <div className='col-lg-3 col-md-6 shadow py-3'>
              <a href='#!'>
                <img
                  src={logo}
                  alt='logo'
                  width='80px'
                  style={{ borderRadius: '50%' }}
                  className='logo'
                />
              </a>
              <h3 className='mt-3'>Rale Print</h3>
            </div>
            <div className='col-lg-3 col-md-6 shadow  py-3'>
              <h4 className='mb-4'>Korisni linkovi</h4>
              <h6>MngoDB</h6>
              <h6>Express</h6>
              <h6>ReactJS</h6>
              <h6>NodeJS</h6>
            </div>
            <div className='col-lg-3 col-md-6 shadow py-3'>
              <h4 className='mb-4'>Korisni linkovi</h4>
              <h6>MngoDB</h6>
              <h6>Express</h6>
              <h6>ReactJS</h6>
              <h6>NodeJS</h6>
            </div>
            <div className='col-lg-3 col-md-6 shadow py-3'>
              <h4 className='mb-4'>Korisni linkovi</h4>
              <h6>MngoDB</h6>
              <h6>Express</h6>
              <h6>ReactJS</h6>
              <h6>NodeJS</h6>
            </div>
          </div>
          <div className='row mt-5'>
            <div className='col text-center'>
              <span className='text-light'>
                &copy; rale print - {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </footer>
      <div className='row'>
        <div className='col'>
          <a href='#' className='mr-3 text-white float-right'>
            <i className='fas fa-arrow-up'></i>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Layout;
