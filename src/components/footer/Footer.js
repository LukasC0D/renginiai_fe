import React from 'react';

const Footer = () => (
  <div className="footer">
    <footer className=" text-center text-white">
      <div className=" p-2">
        <section className="mt-2">
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
        </section>
      </div>
      <div className="text-center p-3">
        © {new Date().getFullYear()} Copyright: LukasC0D
      </div>
    </footer>
  </div>
);
export default Footer;