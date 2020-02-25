import React from 'react';
import styled from 'styled-components';

const AboutComponent = styled.div`
  .about-container {
    display: grid;
    grid-template-areas: 'img info';
    .img {
      grid-area: img;
      margin-bottom: 3em;
    }
    .info {
      grid-area: info;
      padding: 2em;
    }
  }

  @media (max-width: 720px) {
    // height: 100vh;
    .about-container {
      grid-template-areas:
        'img'
        'info';
      .img {
        grid-area: img;
        text-align: center;
        margin-bottom: 1em;
      }
      .info {
        grid-area: info;
        // padding: 2em;
      }
    }
  }
  h2 {
    margin-bottom: 1em;
    font-weight: bold;
    // text-decoration: underline;
  }
  img {
    border: 2px solid #f25042;
    border-radius: 50%;
  }
`;
export default function About({ about }) {
  return (
    <AboutComponent  id='about'>
      <div>
        <h2>About Me</h2>
        <div className='about-container'>
          <div className='img'>
            <img
              src='https://media-exp1.licdn.com/dms/image/C4E03AQFQLTR6jeGqfg/profile-displayphoto-shrink_200_200/0?e=1588204800&v=beta&t=Fs2vh1E-EgoBBh5W2zTLwymWDra4MK_xHDRGGDlNMEU'
              alt="Gabriel Márquez's"
            />
          </div>
          <div className='info'>
            {about.map((ab, index) => (
              <p key={index}>{ab}</p>
            ))}
          </div>
        </div>
      </div>
    </AboutComponent>
  );
}
