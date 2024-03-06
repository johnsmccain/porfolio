import  { useRef } from 'react'
import CustomHook from './CustomHook';
import {Tilt} from "react-tilt"
import { Slide, Zoom } from 'react-awesome-reveal';
import styled from "styled-components";
import {Bio} from "../data/constants"
function Home() {
const scrollTab = useRef();
CustomHook(scrollTab);

return (
    <section ref={scrollTab} className='home' id='home'>
        <div className="content">
            <Slide direction="left" delay={1}>

            <div className="name">
                MY NAME IS <span>{Bio.name}</span>
            </div>
            </Slide>
             <Slide direction="up" delay={1}>
            <div className="des">
               {Bio.description}
            </div>
            </Slide>
            <Zoom>

            {/* <a href="/John's_Resume.pdf" target="_blank" rel="noopener noreferrer" className='animation active '>
                Download My CV
            </a> */}
            <ResumeButton href={Bio.resume} target="_blank">
                Check Resume
              </ResumeButton>
            </Zoom>
        </div>
        <Slide direction='right'>

        <div className="avatar">

            <Tilt>
                <div className="card" >
                    <img src="/Johnsdanlami.jpg" alt="Johnsdanlami" />
                    <div className="info">
                        <div>Developer</div>
                        <div>Nigeria</div>
                        <div>12/97</div>
                        <div>Male</div>
                    </div>
                </div>
            </Tilt>
        </div>
        </Slide>
    </section>
    )
}
const ResumeButton = styled.a`
  -webkit-appearance: button;
  -moz-appearance: button;
  appearance: button;
  text-decoration: none;

  width: 95%;
  max-width: 300px;
  text-align: center;
  padding: 16px 0;

  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  background: -moz-linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  background: -webkit-linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  box-shadow: 20px 20px 60px #1f2634, -20px -20px 60px #1f2634;
  border-radius: 50px;
  font-weight: 600;
  font-size: 20px;

     &:hover {
        transform: scale(1.05);
    transition: all 0.4s ease-in-out;
    box-shadow:  20px 20px 60px #1F2634,
    filter: brightness(1);
    }


    @media (max-width: 640px) {
        padding: 12px 0;
        font-size: 18px;
    }
    color: white;
`;

export default Home
