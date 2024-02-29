import React from 'react';
import { Link } from 'react-router-dom';

import {arrow} from '../assets/icons'

const InfoBox = ({text, link, buttonText}) => {
  return (
    <div className='info-box'>
      <p className="font-medium sm:text-xl text-center">{text}</p>
      <Link to={link} className="neo-brutalism-white neo-btn">
        {buttonText}
        <img src={arrow} className="w-4 h-4 object-contain" />
      </Link>
    </div>
  )
}

const renderContent = {
  1 : (
    <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5"> Hi, I am <span className="font-semibold">Khant Wai Yan</span><br/> A Software Engineer from Myanmar</h1> 
  ),
  2 : (
    <InfoBox
      text="Work with many companies and learn many skills along the way"
      link="/about"
      buttonText="Learn More about me"
    />
  ),
  3 : (
    <InfoBox
      text="Various Projects to sucess over the years. Curious about the impact?"
      link="/projects"
      buttonText="Visit My Projects"
    />
  ),
  4 : (
    <InfoBox
      text="Need a project done or looking for a dev? Don't hesitate to contact me."
      link="/about"
      buttonText="Let's Talk"
    />
  ),
}

const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null;
}

export default HomeInfo;