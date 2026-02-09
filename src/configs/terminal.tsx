import type { TerminalData } from "~/types";

const terminal: TerminalData[] = [
  {
    id: "about",
    title: "about",
    type: "folder",
    children: [
      {
        id: "about-me",
        title: "intro.txt",
        type: "file",
        content: (
          <div className="py-1">
            <div>
              Hi, this is John Danlami. I am a Computer Science student at the University of the People.
            </div>
          </div>
        )
      },
      {
        id: "about-interests",
        title: "interests.txt",
        type: "file",
        content: "MERN Stack / Open Source Contribution  / full stack developement"
      },
      {
        id: "about-who-cares",
        title: "who-cares.txt",
        type: "file",
        content:
          "I'm looking for a SDE internship. I'm open to collaboration on full stack projects."
      },
      {
        id: "about-contact",
        title: "contact.txt",
        type: "file",
        content: (
          <ul className="list-disc ml-6">
            <li>
              Email:{" "}
              <a
                className="text-blue-300"
                href="mailto:johnsdanlami@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                johnsdanlami@gmail.com
              </a>
            </li>
            <li>
              Github:{" "}
              <a
                className="text-blue-300"
                href="https://github.com/johnsmccain"
                target="_blank"
                rel="noreferrer"
              >
                @johnsmccain
              </a>
            </li>
            <li>
              Linkedin:{" "}
              <a
                className="text-blue-300"
                href="https://www.linkedin.com/in/john-danlami-b5a745154/"
                target="_blank"
                rel="noreferrer"
              >
                John-Danlami
              </a>
            </li>
            <li>
              Personal Website:{" "}
              <a
                className="text-blue-300"
                href="https://johnsdanlami.netlify.app"
                target="_blank"
                rel="noreferrer"
              >
                https://johnsdanlami.netlify.app
              </a>
            </li>
            <li>
              X:{" "}
              <a
                className="text-blue-300"
                href="https://x.com/johnsdanlami"
                target="_blank"
                rel="noreferrer"
              >
               find me on x.com
              </a>
            </li>
          </ul>
        )
      }
    ]
  },
  {
    id: "about-dream",
    title: "my-dream.cpp",
    type: "file",
    content: (
      <div className="py-1">
        <div>
          <span className="text-yellow-400">while</span>(
          <span className="text-blue-400">sleeping</span>) <span>{"{"}</span>
        </div>
        <div>
          <span className="text-blue-400 ml-9">money</span>
          <span className="text-yellow-400">++</span>;
        </div>
        <div>
          <span>{"}"}</span>
        </div>
      </div>
    )
  }
];

export default terminal;
