import React from 'react';

export default function About({ about }) {
  return (
    <section id='about' className='mb-5'>
      <h2 className='section-title'>About Me</h2>
      <div className='about-container'>
        {/* <div className='img'>
            <img
              src='https://media-exp1.licdn.com/dms/image/C4E03AQFQLTR6jeGqfg/profile-displayphoto-shrink_200_200/0?e=1588204800&v=beta&t=Fs2vh1E-EgoBBh5W2zTLwymWDra4MK_xHDRGGDlNMEU'
              alt='Gabriel Márquez'
              className='about-photo'
            />
          </div> */}
        <div className='info'>
          {about.map((ab, index) => (
            <p key={index}>{ab}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
