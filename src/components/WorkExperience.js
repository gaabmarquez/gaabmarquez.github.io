import React from 'react';

export default function WorkExperience({ works }) {
  return (
    <div id='experience'>
      <section className='work-history mt-4'>
        <h2>Experience</h2>
        <div className='work-experience'>
          {works.map(work => {
            return (
              <div key={work.id} className='work'>
                <h3>{work.title}</h3>
                <span className='company'> {work.company}</span>
                <span className='dates'>
                  {work.from} - {work.to}
                </span>
                <p>{work.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
