import React from 'react';
import './About.css';
// import Image from '../../assets/avatar-2.svg';
import Resume from '../../assets/resume.pdf';
import AboutBox from './AboutBox';

const About = () => {
    const downloadResume = async () => {
        window.open(Resume, '_blank');
    }


    return (
        <section className="about container section" id="about">
            <h2 className="section__title">About Me </h2>

            <div className="about__container grid">
                <img src="/pruthvi.png" alt="" className='about__img' />

                <div className="about__data grid">
                    <div className="about__info">
                        <p className="about__description">
                            Hello! I'm Pruthviraj Gaikwad, and I'm from Pune, India. I am currently studying at Shri Guru Gobind Singhji Institute of Engineering and Technology (SGGSIE&T), Nanded, where I am pursuing a degree in Information Technology.<br /><br />
                            Fast forward to today, I can honestly say it has been a wonderful journey, and I look forward to growing even further as a Software Engineer. My current focus is on expanding my portfolio by building more projects to showcase here, as well as developing my skills to become an excellent team player in future professional roles.<br /><br />
                            Here are a few technologies I’ve been working with recently:

                        </p>
                        <ul className="about__list">
                            <li>JavaScript (ES6+)</li>
                            <li>TypeScript</li>
                            <li>React</li>
                            <li>Node.js</li>
                            <li>MYSQL</li>
                            <li>NextJS</li>
                            <li>java-8</li>
                            <li>MERN STAK</li>
                            <li>Python</li>
                            <li>Cyber Security</li>
                            <li>DSA</li>
                            <li>LongChain (LLMs)</li>
                        </ul>
                        <button className="btn" onClick={downloadResume}>Donwload CV</button>

                    </div>
                    <br />
                    <div className="about__skills grid">
                        <div className="skills__data">
                            <div className="skills__titles">
                                <h3 className="skills__name">java</h3>
                                <span className="skills__number">80%</span>
                            </div>

                            <div className="skills__bar">
                                <span className="skills__percentage development">

                                </span>
                            </div>
                        </div>

                        <div className="skills__data">
                            <div className="skills__titles">
                                <h3 className="skills__name">Full Stack Development</h3>
                                <span className="skills__number">70%</span>
                            </div>

                            <div className="skills__bar">
                                <span className="skills__percentage ui__design">

                                </span>
                            </div>
                        </div>

                        <div className="skills__data">
                            <div className="skills__titles">
                                <h3 className="skills__name">AI/ML</h3>
                                <span className="skills__number">65%</span>
                            </div>

                            <div className="skills__bar">
                                <span className="skills__percentage photography">

                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AboutBox />
        </section>
    )
}

export default About