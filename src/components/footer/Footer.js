import React from 'react';
import logo from '../images/react-native-firebase-1.svg'
import logo1 from '../images/laravel-2.svg'

const Footer = () => (
  <div className="footer d-flex justify-content-around">
    <div>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
    <footer className=" text-center text-white">
      <a
        className="btn btn-outline-light btn-floating m-1"
        href="https://www.linkedin.com/in/lukas-ka/"
        role="button"
      >
        <i className="bi bi-linkedin"></i>
      </a>
      <a
        className="btn btn-outline-light btn-floating m-1"
        href="https://github.com/LukasC0D"
        role="button"
      >
        <i className="bi bi-github"></i>
      </a>
      <div className='pt-2'>
        <p>© {new Date().getFullYear()} Copyright: LukasC0D</p>
      </div>
    </footer>
    <div>
      <img src={logo1} className="App-lara" alt="logo" />
    </div>
  </div>
);
export default Footer;