import React from 'react';
import PortfolioCard from '../PortfolioCard';

export default function Porfolio() {
  return (
    <section className='portfolio' id='portfolio'>
      <h2 className='section-title'>Portfolio</h2>
      <div className='projects'>
        <PortfolioCard
          projectName='Trello Clone'
          screenshot='https://media.giphy.com/media/JobbH6syUm4mMTipPI/giphy.gif'
          description='This project is a basic Trello clone, with minimum functionality implemented.
                        Created using React & Redux'
          githubLink='https://github.com/gaabmarquez/trello-clone'
          liveLink='https://gaabmarquez.github.io/trello-clone/'
        />

        <PortfolioCard
          projectName='Book Worms'
          screenshot='https://media.giphy.com/media/MFTyTobZHskcq4sSXw/giphy.gif'
          description='This project was meant to archive books that I read and the words that I learn.
          Developed using Angular 7 & Bootstrap'
          githubLink='https://github.com/gaabmarquez/bookworms'
          liveLink='https://gaabmarquez.github.io/bookworms'
        />

        <PortfolioCard
          projectName='Cool Music'
          screenshot='https://i.ibb.co/Gd6F4kf/Screen-Shot-2020-05-07-at-13-13-26.png'
          description='Project Integrated with Lastfm API that list Top 20 artists of the moment 
          Developed using Angular 7 & Bootstrap'
          githubLink='https://github.com/gaabmarquez/coolmusic'
          liveLink='https://gaabmarquez.github.io/coolmusic/'
        />
      </div>
    </section>
  );
}
