import React from 'react';

export default function WorkExperience({ works }) {
  return (
    <section id='experience' className=' mt-4'>
      <h2 className='section-title'>Experience</h2>
      {works.map(work => {
        return (
          <div key={work.id} className='work'>
            <h4>{work.title}</h4>
            <div className='work-company-date-container'>
              <span className='company'> {work.company}</span>
              <span className='dates'>
                {work.from} - {work.to}
              </span>
            </div>
            {work.description.map((task, index) => {
              return (
                <p key={index} className='work-task'>
                  {task}
                </p>
              );
            })}

            {/* </p> */}
          </div>
        );
      })}
    </section>
  );
}
