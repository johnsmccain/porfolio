import React from "react";
import "./intro.css";
import me from "../../img/Johnsdanlami.JPG";
export default function Intro() {
  return (
    <div className="i">
      <div className="i-left">
        <div className="i-left-wrapper">
          <h2 className="i-intro">Hi, My name is</h2>
          <h1 className="i-name">John Danlami</h1>
          <div className="i-title">
            <div className="i-title-wrapper">
              <div className="i-title-item">Web Devoloper</div>
              <div className="i-title-item">Front end</div>
              <div className="i-title-item">Backend</div>
              <div className="i-title-item">React</div>
              <div className="i-title-item">MERN</div>
            </div>
          </div>
          <div className="i-desc">
            I’m a software engineer specializing in building things for the web.
            Currently, I’m focused on Frontend
          </div>
        </div>
        <div className="i-scroll">
          <div className="i-inner"></div>
          <div className="i-inner1"></div>
        </div>
      </div>
      <div className="i-right">
        <div className="i-bg"></div>
        <div className="img-wrapper">
          <div className="img">
            <img src={me} alt="Johns Danlami" className="i-img" />
          </div>
        </div>
      </div>
    </div>
  );
}
