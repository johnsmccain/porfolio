import React, { useContext } from "react";
import "./about.css";
import me from "../../img/me.jpg";

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
          that my career mentor,
          <a
            href="https://twitter.com/ThomasGreat3?t=V_7X13BZGhwkGFRleBR8BA&s=09"
            className="links"
          >
            <strong>
              {" "}
              <i>Monte Thomas </i>
            </strong>
          </a>
          played a major role in seeing that I develope the best soft/hard skill
          for the coming wave.
        </p>
        <div className="a-award">
          <div className="a-award-texts">
            <h4 className="a-award-title">Certificates :</h4>
            <ul className="a-lead-list">
              <li className="a-lead">
                {" "}
                <a
                  className="a-link"
                  href="https://www.udemy.com/certificate/UC-9718a38d-c7b0-4085-bd65-7cc215959658/"
                >
                  Front End Web Development
                </a>{" "}
              </li>
              <li className="a-lead">
                {" "}
                <a
                  className="a-link"
                  href="https://www.sololearn.com/Certificate/1097-10142238/jpg
"
                >
                  REACT{" "}
                </a>{" "}
              </li>
              <li className="a-lead">
                {" "}
                <a
                  className="a-link"
                  href="https://www.udemy.com/certificate/UC-be4f7575-0d24-483c-a4cd-1c152a9a8c73/
"
                >
                  JAVASCRIPT, HTML5, CSS3{" "}
                </a>{" "}
              </li>
              <li className="a-lead">
                {" "}
                <a
                  className="a-link"
                  href="https://www.udemy.com/certificate/UC-826525d2-993d-4dfa-b949-b30ca625281c/
"
                >
                  {" "}
                  MERN Stack
                </a>{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
