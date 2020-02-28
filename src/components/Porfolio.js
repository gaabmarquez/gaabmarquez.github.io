import React from 'react';

export default function Porfolio() {
  return (
    <section className='portfolio' id='portfolio'>
      <h2 className='section-title'>Portfolio</h2>

      <div className='card' style={{ width: '18rem' }}>
        <img
          className='card-img-top'
          src='https://media.giphy.com/media/JobbH6syUm4mMTipPI/giphy.gif'
          alt='Trello Clone'
        />

        <div className='card-body'>
          <p className='card-text'>
            This project is a basic Trello clone, with minimum functionality
            implemented.
          </p>
          <p>Created using React & Redux</p>
          <a
            href='https://github.com/gaabmarquez/trello-clone'
            target='_blank'
            rel='noopener noreferrer'
            className='github-link'
          >
            <i className='fab fa-github'></i>
            Github
          </a>

          <a
            href='https://gaabmarquez.github.io/trello-clone/'
            target='_blank'
            rel='noopener noreferrer'
            className='project-link'
          >
            <i className='fas fa-link'></i>
            Live version
          </a>
        </div>
      </div>
    </section>
  );
}
