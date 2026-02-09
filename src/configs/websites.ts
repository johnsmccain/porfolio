import type { WebsitesData } from "~/types";

const websites: WebsitesData = {
  favorites: {
    title: "SNS Links",
    sites: [
      {
        id: "my-email",
        title: "Email",
        img: "img/sites/gmail.svg",
        link: "mailto:johnsdanlami@gmail.com",
      },
      {
        id: "my-github",
        title: "Github",
        img: "img/sites/github.svg",
        link: "https://github.com/johnsmccain",
      },
      {
        id: "my-linkedin",
        title: "Linkedin",
        img: "img/sites/linkedin.svg",
        link: "https://www.linkedin.com/in/john-danlami-b5a745154/",
      },
      {
        id: "my-twitter",
        title: "Twitter",
        img: "img/sites/twitter.svg",
        link: "https://x.com/johnsdanlami",
      },
      {
        id: "Medium",
        title: "Medium",
        img: "img/sites/gfg.png",
        link: "https://medium.com/@johnsdanlami",
      },
    ],
  },
  freq: {
    title: "Frequently Visited",
    sites: [
      {
        id: "hacker-news",
        title: "Hacker News",
        img: "img/sites/hacker.svg",
        link: "https://news.ycombinator.com/",
      },
      {
        id: "github",
        title: "Github",
        img: "img/sites/github.svg",
        link: "https://github.com/",
      },
      {
        id: "twitter",
        title: "Twitter",
        img: "img/sites/twitter.svg",
        link: "https://www.twitter.com/",
      },
      {
        id: "leetcode",
        title: "LeetCode",
        img: "img/sites/leetcode.svg",
        link: "https://hackerranker.com/",
      },
      {
        id: "GeeksforGeeks",
        title: "GeeksforGeeks",
        img: "img/sites/gfg.png",
        link: "https://www.geeksforgeeks.org/",
      },
    ],
  },
};

export default websites;
