/*
  Using React Vertical Timeline Component 
  https://www.npmjs.com/package/react-vertical-timeline-component
*/
import { skills, experiences } from '../constants';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import ContactLink from '../components/ContactLink';

const About = () => {
  const intersectionObserverProps = {
    // threshold: 0.5, 
    rootMargin: '0px 0px 100px 0px', 
  };
  return (
    <section className="max-container">
      <h1 className="head-text">
        Hello, I am <span className="blue-gradient_text font-semibold drop-shadow">Khant Wai Yan</span>
      </h1>
      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>
          Software Engineer based in Myanmar aka Burma, specializing in technical education through hands-on learning and building applications and software.
        </p>
      </div>
      {/* Skills */}
      <div className="py-10 flex flex-col">
        <h3 className="subhead-text">My skills</h3>
        <div className="mt-16 flex flex-wrap gap-12">
          {skills.map((skill) => (
            <div className="block-container w-20 h-20" key={skill.name}>
              <div className="btn-back rounded-xl" />
              <div className="btn-front rounded-xl flex justify-center items-center">
                <img 
                  src={skill.imageUrl}
                  alt={skill.name}
                  className="w-1/2 h-1/2 object-contain"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
      {/* Work Experience */}
      <div className="py-16">
          <h3 className="subhead-text">Work Experience</h3>
          <div className="mt-5 flex flex-col gap-3 text-slate-500">
            <p>
              I've worked with all sorts of companies, leveling up my skills and teaming up with smart people. Here's the rundown:
            </p>
        </div>
        <div className="mt-12 flex">
            <VerticalTimeline animate={true}>
              {experiences.map((experience)=>(
                <VerticalTimelineElement
                  intersectionObserverProps={intersectionObserverProps}
                  key={experience.company_name}
                  date={experience.date}
                  icon={
                    <div className="flex justify-center items-center w-full h-full">
                      <img 
                        src={experience.icon}
                        alt={experience.company_name}
                        className="w-[60%] h-[60%] object-contain"
                      />
                    </div>
                  }
                  iconStyle={{background: experience.iconBg}}
                  contentStyle={{
                    borderBottom: "8px",
                    borderStyle: "solid",
                    borderBottomColor: experience.iconBg,
                    boxShadow: "none"
                  }}
                >
                  <div>
                    <h3>{experience.title}</h3>
                    <p className="text-black-500 font-medium font-base" style={{margin:0}}>
                      {experience.company_name}
                    </p>
                  </div>
                  <ul className="my-5 list-disc ml-5 space-y-2">
                    {experience.points.map((point, index) => (
                      <li key={`experience-point-${index}`} className="text-black-500/50 font-normal pl-1 text-sm">
                        {point}
                      </li>
                    ))}
                  </ul>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
        </div>
      </div>
      <hr className="border-slate-200" />
      <ContactLink />
    </section>
  )
}

export default About