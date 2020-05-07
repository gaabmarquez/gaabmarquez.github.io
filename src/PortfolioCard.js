import React from 'react';

export default function PortfolioCard({
  projectName,
  screenshot,
  description,
  githubLink,
  liveLink,
}) {
  return (
    <div className='card' style={{ width: '18rem' }}>
      <div className='card-body'>
        <h4 className='card-title'>{projectName}</h4>
        <img className='card-img-top' src={screenshot} alt='Trello Clone' />
        <p className='card-text mt-4'>{description}</p>

        <div className='links'>
          <a
            href={githubLink}
            target='_blank'
            rel='noopener noreferrer'
            className='github-link'
          >
            <i className='fab fa-github'></i>
            Github
          </a>

          <a
            href={liveLink}
            target='_blank'
            rel='noopener noreferrer'
            className='project-link'
          >
            <i className='fas fa-link'></i>
            Live version
          </a>
        </div>
      </div>
    </div>
  );
}
