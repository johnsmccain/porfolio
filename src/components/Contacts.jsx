// import React, { useState, useRef } from 'react'
// import CustomHook from './CustomHook';
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
// function Contacts() {
// const [listContacts] = useState([
//   {
//     title: 'Phone Number',
//     value: '+84123XXX'
//   },{
//     title: 'Email',
//     value: 'hohoang.dev@gmail.com'
//   },{
//     title: 'Instagram',
//     value: '@lundev.web'
//   }
// ])
// const divs = useRef([]);
// const scrollTab = useRef();
// CustomHook(scrollTab, divs);

//   return (
//     <section className='contacts' ref={scrollTab}>
//        <div className="title" ref={(el) => el && divs.current.push(el)}>
//         This is my Contacts
//        </div>
//        <div className="des" ref={(el) => el && divs.current.push(el)}>
//         {/* 20 */}
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam perspiciatis quae veniam amet nesciunt voluptatibus quis consectetur consequatur quisquam harum.
//        </div>
//        <div className="list"  ref={(el) => el && divs.current.push(el)}>
//         {
//           listContacts.map((value, key) => (
//             <div className='item' key={key}>
//               <h3>{value.title}</h3>
//               <div>{value.value}</div>
//             </div>
//           ))
//         }
//        </div>
//     </section>
//   )
// }
// export default Contacts



import styled from "styled-components";
import { MdAlternateEmail } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { HiOutlineMailOpen } from "react-icons/hi";
import { AiFillGithub, AiFillLinkedin, AiOutlineArrowUp } from "react-icons/ai";
import { BsFacebook, BsWhatsapp } from "react-icons/bs";
import { FiMail, FiPhoneCall } from "react-icons/fi";
import { Slide, Zoom, Fade } from "react-awesome-reveal";
import { WhatsApp } from "@mui/icons-material";
import { useState } from "react";

const Footer = () => {

//  const form = useRef();
  const [name, setname] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const sendEmail = (e) => {
    e.preventDefault();

    const serviceId = import.meta.env.VITE_SERVICE_ID;
    const templateId = import.meta.env.VITE_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;


    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      to_name: "My portfolio",
    }

    emailjs.send(serviceId, templateId, templateParams, publicKey).then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      toast.success('Email sent successfully!');
      setname("")
      setEmail("")
      setMessage("")

    }).catch((err) => {
      console.log('FAILED...', err);
      toast.error(`Something went wrong! ${err.text}`);
    })
// console.log(form.current)
    // emailjs
    //   .sendForm('service_vmax2fw', 'template_ujxp5sn', form.current, {
    //     publicKey: 'user_dGg7G0iKobFpP0TjmdwTZ',
    //   })
    //   .then(
    //     () => {
    //       // console.log('SUCCESS!');
    //       toast.success('Email sent successfully!');
    //       console.log('Email sent successfully!');
    //       // form.current.reset();
    //       // scrollUp();
    //     },
    //     (error) => {
    //       console.log('FAILED...', error.text);
    //       toast.error(`Something went wrong! ${error.text}`);

    //     },
    //   );
  };
  const scrollUp = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <Container id="contacts">
      <Profile>
        <Slide direction="left" delay={1}>
          <h1>Contact</h1>
        </Slide>
        <div className="address">
          <Slide direction="left">
            <h1>Address:</h1>
          </Slide>
          <Slide direction="left">
            <p>33 Kasaya New Buwaya Kaduna, Nigeria(NG), </p>
          </Slide>
        </div>
        <div className="links">
          <Slide direction="left">
            <h1>Contact me directly:</h1>
          </Slide>
          <div>
            <span>
              <FiPhoneCall />
            </span>
            <Slide direction="left">
              <a href="tel:+2348129419736">+234 812 9419 736</a>
            </Slide>
          </div>
          <div>
            <Slide direction="left">
              <span>
                <HiOutlineMailOpen />
              </span>
            </Slide>
            <Slide>
              <a href="mailto:johnsdanlami@gmail.com">johnsdanlami@gmail.com</a>
            </Slide>
          </div>
          <div>
            <Slide direction="left">
              <span>
                <WhatsApp/>
              </span>
            </Slide>
            <Slide>
              <a href="https://wa.me/2348129419736">+2348129419736</a>
            </Slide>
          </div>
        </div>
        <div className="profiles">
          <Slide direction="left">
            <h1>Check my profiles</h1>
          </Slide>
          <div className="icons">
            <Zoom>
              <span>
                <a href="https://github.com/johnsmccain">
                  <AiFillGithub />
                </a>
              </span>
            </Zoom>
            <Zoom>
              <span>
                <a href="https://web.facebook.com/johnsdanlami">
                  <AiFillLinkedin />
                </a>
              </span>
            </Zoom>
            <Zoom>
              <span>
                <a href="https://web.facebook.com/johnsdanlami">
                  <BsFacebook />
                </a>
              </span>
            </Zoom>
            <Zoom>
              <span>
                <a href="/">
                  <BsWhatsapp />
                </a>
              </span>
            </Zoom>
          </div>
        </div>
        <Fade>
          <ArrowUp onClick={scrollUp}>
            <AiOutlineArrowUp />
          </ArrowUp>
        </Fade>
      </Profile>
      <Form>
        <Slide direction="right">
          <form
          // ref={form}
          onSubmit={sendEmail}>
            <div className="name">
              <span>
                <CgProfile />
              </span>
              <input type="text" placeholder="Fullname..." name="user_name" value={name} onChange={(e)=> setname(e.target.value)}/>
            </div>
            <div className="email">
              <span>
                <MdAlternateEmail />
              </span>
              <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Email..."  name="user_email"/>
            </div>
            <div className="message">
              <span className="messageIcon">
                <FiMail />
              </span>
              <textarea cols="30" rows="10" placeholder="Message..." value={message} onChange={(e)=> setMessage(e.target.value)} name="message"></textarea>
            </div>
            <SubmitButton type="submit">Submit</SubmitButton>
          </form>
        </Slide>
      </Form>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  margin-top: 2rem;
  position: relative;
  padding: 2rem 0;
  width: 80%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  @media (max-width: 840px) {
    width: 90%;
  }

  @media (max-width: 650px) {
    flex-direction: column;
    gap: 3rem;
  }
`;
const Profile = styled.div`
  flex: 1;
  .address {
    padding: 1rem 0;
    h1 {
      font-size: 1.2rem;
    }

    p {
      width: 60%;
      padding-top: 0.5rem;
      @media (max-width: 650px) {
        width: 100%;
      }
    }
  }

  .links {
    h1 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }

    div {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      a {
        text-decoration: none;
        color: lightgray;
        :hover {
          color: orange;
        }
      }
    }
  }

  .profiles {
    h1 {
      font-size: 1.2rem;
      padding: 1rem 0;
    }

    .icons {
      display: flex;
      align-items: center;

      span {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #000;
        width: 2rem;
        height: 2rem;
        margin-right: 0.5rem;
        border-radius: 50px;

        :hover {
          background-color: orange;
        }

        a {
          margin-top: 0.2rem;
          color: #fff;
        }
      }
    }
  }
`;
const ArrowUp = styled.div`

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


  width: 2rem;
  height: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.3rem;
  font-weight: 700;
  margin-top: 2rem;
  @media (max-width: 650px) {
    position: absolute;
    right: 3rem;
    top: 16rem;
  }
`;
const Form = styled.div`
  flex: 1;
  h1 {
    font-size: 1.3rem;
    padding-bottom: 0.7rem;
  }

  form {
    background-color: #191923;
    padding: 0.8rem;
    border-radius: 5px;
    .name,
    .email,
    .message {
      display: flex;
      border: 1px solid gray;
      margin-bottom: 0.5rem;
      input,
      textarea {
        width: 100%;
        border: none;
        outline: none;
        color: #fff;
        background-color: transparent;
        padding: 1rem 0.5rem;
      }
      span {
        background-color: #3e3e3e;
        width: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .messageIcon {
        align-items: flex-start;
        padding-top: 0.5rem;
      }
    }

    button {
      width: 5rem;
      height: 1.8rem;
      background-color: #01be96;
      border: none;
      border-radius: 5px;
      filter: drop-shadow(0px 4px 5px #01be9551);
      cursor: pointer;
      :hover {
        filter: drop-shadow(0px 6px 9px #01be9551);
      }
    }
  }
`;
const SubmitButton = styled.button`
  -webkit-appearance: button;
  -moz-appearance: button;
  appearance: button;
  text-decoration: none;

  width: 95%;
  max-width: 300px;
  text-align: center;


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
  font-size: 16px;

     &:hover {
        transform: scale(1.05);
    transition: all 0.4s ease-in-out;
    box-shadow:  20px 20px 60px #1F2634,
    filter: brightness(1);
    }


    @media (max-width: 640px) {

        font-size: 18px;
    }
    color: white;
`;