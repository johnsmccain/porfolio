import './App.css'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from "./components/Experience";
import Education from './components/Education'
import Contacts from './components/Contacts'
import styled from "styled-components";
import { useState } from 'react'
import Footer from './components/Footer'
import {AnimatePresence} from "framer-motion"
import ProjectDetails from './components/Dialog/ProjectDetails'


function App() {
 const [openModal, setOpenModal] = useState({ state: false, project: null });
  return (
    <main>
      <NavBar />
      <Body>
<AnimatePresence>

      <div >
        <Home />
        <Wrapper>
          <Skills />
          <Experience />
        </Wrapper>
      <Projects openModal={openModal} setOpenModal={setOpenModal} />
      <Wrapper>
<Education />
      <Contacts />
      </Wrapper>

      <Footer/>
       {openModal.state && (
         <ProjectDetails
         openModal={openModal}
         setOpenModal={setOpenModal}
         />
         )}
        </div>
         </AnimatePresence>
      </Body>
      {/* <Skills /> */}
    </main>
  );
}

const Wrapper = styled.div`
  padding-bottom: 100px;
  background: linear-gradient(
      38.73deg,
      rgba(204, 0, 187, 0.15) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(0, 70, 209, 0) 50%,
      rgba(0, 70, 209, 0.15) 100%
    );
  S
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;
const Body = styled.div`

  width: 100%;
  overflow-x: hidden;
  position: relative;
`;
export default App;
