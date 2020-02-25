import React from 'react';
import './Hero.scss';
import styled from 'styled-components';

const HeroComponent = styled.div`
  height: 100vh;
  margin-top: 10em;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1,
  h2,
  h3 {
    padding-bottom: 1.5rem;
  }

  .mouse {
    color: #f25042;
    animation: mymove 2s infinite;
    position: relative;
    margin-top: 3em;
  }

  @keyframes mymove {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(50px);
    }
    100% {
      transform: translateY(0);
    }
  }

  @media (max-width: 720px) {
    margin-top: 2em;

    .mouse {
      margin-top: 1em;
    }
  }
`;
export default function Hero() {
  return (
    <HeroComponent>
      <h1>
        Hello World! I'm
        <span className='color-primary'> Gabriel Márquez</span>
      </h1>
      <h2>Software developer based in Uruguay</h2>
      <h3>Love to craft solutions, frontend and backend</h3>
      <h4>
        Scroll to know more about
        <span className='color-primary'> me</span>
      </h4>
      <i className='fas fa-mouse fa-2x  mouse color-primary'></i>
    </HeroComponent>
  );
}
