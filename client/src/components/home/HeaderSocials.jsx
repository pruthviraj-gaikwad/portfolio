import React from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { SiGeeksforgeeks,SiLeetcode  } from 'react-icons/si';

const HeaderSocials = () => {
    return (
        <div className='home__socials'>
            <a href='https://github.com/pruthviraj-gaikwad' className='home__social-link' target='_blank' rel='noreferrer'>
                <FaGithub />
            </a>

            <a href='https://www.linkedin.com/in/pruthviraj-gaikwad-1a749a28b/' className='home__social-link' target='_blank' rel='noreferrer'>
                <FaLinkedinIn />
            </a>

            <a href='https://leetcode.com/u/pruthvi9356/' className='home__social-link' target='_blank' rel='noreferrer'>
                <SiLeetcode />
            </a>
        
            <a href='https://www.geeksforgeeks.org/user/pruthvirapf8r/?_gl=1*13f4soz*_up*MQ..*_gs*MQ..&gclid=Cj0KCQjwqebEBhD9ARIsAFZMbfwD-Q-CWH9PA4VL2DgdCubC1vNgzwguariIs0yVTaz-OF_L6lZ8s_UaAjbSEALw_wcB&gbraid=0AAAAAC9yBkAhXRZZkltPWpxI8JTZddsQM' className='home__social-link' target='__blank' rel='noreferrer'>
                <SiGeeksforgeeks />
            </a>

        </div>
    );
};

export default HeaderSocials;
