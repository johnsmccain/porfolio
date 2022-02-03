import React from "react";
import "./contact.css";
import phone from "../../img/phone.png";
import address from "../../img/address.png";
import email from "../../img/email.png";
import { useContext, useRef, useState } from "react";
import emailjs from "emailjs-com";
import { ThemeContext } from "../../contex";
import { LinkedIn, GitHub, Twitter } from "@mui/icons-material";
export default function Contact() {
  const theme = useContext(ThemeContext);
  const dark = theme.state.darkMode;
  const color1 = "black";
  const color2 = "white";
  const [done, setDone] = useState(false);
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_vmax2fw",
        "template_ujxp5sn",
        formRef.current,
        "user_dGg7G0iKobFpP0TjmdwTZ"
      )
      .then(
        (result) => {
          console.log(result.text);
          setDone(true);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="c">
      <div className="c-bg"></div>
      <div className="c-wrapper">
        <div className="c-left">
          <div className="c-tile" style={{ color: dark ? "white" : "#5b43d6" }}>
            Get In Touch
          </div>
          <p className="c-lead">
            I’m currently looking for any new opportunities, my inbox is always
            open. I’ll try my best to get back to you!
          </p>
          <div className="c-info">
            <a
              href="tel:+2348129419736"
              className="c-info-item"
              style={{ color: dark ? color2 : color1 }}
            >
              <img src={phone} alt="phone number" className="c-info-icon" />
              +1248129419736
            </a>
            <a
              href="mailto:johnsdanlami@gmail.com"
              className="c-info-item"
              style={{ color: dark ? color2 : color1 }}
            >
              <img
                src={email}
                alt="johnsdanlami@gmail.com"
                className="c-info-icon"
              />
              Johnsdanlami@gmail.com
            </a>
            <span
              className="c-info-item"
              style={{ color: dark ? color2 : color1 }}
            >
              <img src={address} alt="adress" className="c-info-icon" />
              No.33,New Buwaya, Abuja Express Way, Kaduna State, Nigeria.
            </span>
          </div>
          <ul className="socials">
            <li className="social">
              <a
                href="https://github.com/johnsmccain
"
              >
                <GitHub className="c-social-icon" />{" "}
                <span className="link-text">GitHub</span>
              </a>
            </li>
            <li className="social">
              <a href="https://twitter.com/Johnsdanlami?t=O339Ucqk0bbQZYxxhNDRBA&s=09">
                <Twitter fontSize="medium" className="c-social-icon" />
                <span className="link-text">Twitter</span>
              </a>
            </li>
            <li className="social">
              <a
                href="https://www.linkedin.com/in/john-danlami-b5a745154
"
              >
                <LinkedIn className="c-social-icon" />
                <span className="link-text">LinkedIn</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="c-right">
          <p className="c-desc">
            <b>What is your story</b> wannna get in touch or collabrate?
          </p>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            autoComplete="false"
            autoCorrect="false"
          >
            <input
              style={{
                backgroundColor: dark && "#333",
                color: dark && "#e7e7e7",
              }}
              type="text"
              placeholder="Name"
              name="user_name"
            />
            <input
              style={{
                backgroundColor: dark && "#333",
                color: dark && "#e7e7e7",
              }}
              type="text"
              placeholder="Subject"
              name="user_subject"
            />
            <input
              style={{
                backgroundColor: dark && "#333",
                color: dark && "#e7e7e7",
              }}
              type="text"
              placeholder="Email"
              name="user_email"
            />
            <textarea
              style={{
                backgroundColor: dark && "#333",
                color: dark && "#e7e7e7",
              }}
              placeholder="Message"
              name="message"
              rows="5"
            ></textarea>
            <div className="btn">
              <button type="submit">Submit</button>
              {done && "Thank you..."}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
