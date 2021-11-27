import React, { useContext } from "react";
import "./about.css";
import me from "../../img/me.jpg";

import pic3 from "../../img/CSS_certificate.jpg";
import { ThemeContext } from "../../contex";
export default function About() {
  const theme = useContext(ThemeContext);
  const dark = theme.state.darkMode;
  return (
    <div className="a">
      <div className="a-left">
        <div className="a-card bg "></div>
        <div className="a-card">
          <img src={me} alt="a-card" className="a-img" />
        </div>
      </div>
      <div className="a-right">
        <h1 className="a-title">About Me</h1>
        <p className="a-sub">
          Hello! My name is John Danlami and I enjoy creating things that live
          on the internet.
        </p>
        <p
          className="desc"
          style={{
            backgroundColor: dark ? "#000" : "#eee",
            color: dark ? "#aaa" : "#333",
          }}
        >
          My interest in web development started in 2021. I went all in learning
          with free tools online, then later joined an organized front end web
          development program/cohort in the city where I live. Worth mentioning
          that my career mentor, Monte Thomas played a major role in seeing that
          I develope the best soft/hard skill for the coming wave.
        </p>
        <div className="a-award">
          <img src={pic3} alt="award-pics" className="a-award-img" />
          <div className="a-award-texts">
            <h4 className="a-award-title">
              Here are a few technologies I’ve been working with :
            </h4>
            <p className="a-lead">JavaScript (ES6+) React and Node.js</p>
          </div>
        </div>
      </div>
    </div>
  );
}
