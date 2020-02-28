import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  visibility: hidden;
  opacity: 0;
  animation: fadeIn 0.5s linear;
  // transition: visibility 1s linear;
  transition: opacity 600ms, visibility 600ms;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`;

export default function CustomNav() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  const handleScroll = ev => {
    if (window.pageYOffset > window.innerHeight - 60) {
      setShow(true);
      // console.log(window.location.href)
      // if(window.location.href.includes('#')){
      //   window.location= window.location.href.split('#')[0];
      // }
    } else {
      setShow(false);
    }
  };

  return (
    <Nav
      className='navbar navbar-expand-lg fixed-top  navbar-dark bg-dark'
      id='navbar'
      style={show ? { visibility: 'visible', opacity: '1' } : {}}
    >
      <span className=' title navbar-brand '>Gabriel Márquez</span>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarNav'
        aria-controls='navbarNav'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarNav'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <a className='nav-link' href='#about'>
              About
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#experience'>
              Experience
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link ' href='#skills'>
              Skills
            </a>
          </li>

          <li className='nav-item'>
            <a className='nav-link' href='#portfolio'>
              Portfolio
            </a>
          </li>
        </ul>
      </div>
    </Nav>
  );
}
