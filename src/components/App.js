import React from 'react';
import './App.scss';
import About from './About';
import Portfolio from './Porfolio';
import WorkExperience from './WorkExperience';
import Skills from './Skills';
import Hero from './Hero';
import CustomNav from './CustomNav';
const info = {
  about: [
    `I am focused on creating elegant solutions applying good practices, design patterns in seek of improve maintainability, understanding and efficiency of the code. Actually I am working as a frontend developer, developing solutions with Angular 5+, HTML, CSS, SASS among others.`,
    `I'm passionate about software development in general, I'm always trying new technologies and working on side projects.`
  ],
  works: [
    {
      id: 1,
      title: 'Full Stack Developer',
      company: 'Blue Trail Software',
      from: 'January 2018',
      to: 'January 2020',
      description: `
        Development of solutions with Angular 5 & 7, HTML, CSS, SASS among others.
        Development of re usable components and libraries to improve maintainability.
        Maintenance of existing application in Java using GWT and mGWT framework.
        Jira Addons development using Javascript and React framework.
        Maintenance of existing application in NodeJS, vanilla Javascript and Mongo database.
    `
    },
    {
      id: 2,
      title: 'Software Engineer',
      company: 'Netlabs',
      from: 'May 2016',
      to: 'January 2018',
      description: `
        Management and monitoring of projects through agile methodologies.
        Research of new technologies seeking productivity improvements .
        Migration from monolithic architecture to microservices.
        Design, implementation and deploy of microservices.
        Web applications developed using Angular 2+, Bootstrap, CSS 3 and HTML5.
        Scripting using shell, awk, vi.
        Implementation of DevOps practice, techniques and tools.
        Continuous Integration and Continuous Deployment proficiency in tools such as Jenkins CI, Nexus and SonarQube.
`
    },
    {
      id: 3,
      title: 'Java Software Engineer',
      company: 'GEOCOM',
      from: 'Agoust 2014',
      to: 'May 2016',
      description: `
      Developed backend solutions (Java, Spring, Hibernate, PostgreSQL and Oracle Databases)
      Management and monitoring of projects.
      Research of new technologies seeking productivity improvements.
      Design and implementation of backend systems.
      Web applications developed using HTML, CSS, JSP, JSF, Primefaces, Struts among others.
      Continuous Integration and Continuous Deployment proficiency in tools such as Jenkins CI, Nexus and SonarQube.
`
    }
  ]
};

const App = () => {
  return (
    <div className='container'>
      <Hero />
      <CustomNav />
      <div data-spy='scroll' data-target='#navbar-example2' data-offset='0'>
        <About id='about' about={info.about} />
        <WorkExperience works={info.works} />
        <Skills  className='dark-bg' />
        <Portfolio  />
      </div>

      <section id='fat' className='contact dark-bg'>
        <h2>Contact</h2>
      </section>
    </div>
  );
};

export default App;
