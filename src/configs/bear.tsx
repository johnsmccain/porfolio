import type { BearData } from "~/types";

const bear: BearData[] = [
  {
    id: "profile",
    title: "Profile",
    icon: "i-fa-solid:paw",
    md: [
      {
        id: "about-me",
        title: "About Me",
        file: "markdown/about-me.md",
        icon: "i-la:dragon",
        excerpt: "Full-Stack Developer | Smart Contract Engineer | Mobile Developer | Freelancer"
      },
      {
        id: "github-stats",
        title: "Github Stats",
        file: "markdown/github-stats.md",
        icon: "i-icon-park-outline:github",
        excerpt: "Open-source contributions and development statistics"
      },
      {
        id: "about-site",
        title: "About This Site",
        file: "markdown/about-site.md",
        icon: "i-octicon:browser",
        excerpt: "Modern portfolio built with React, TypeScript, and Web3 technologies"
      }
    ]
  },
  {
    id: "project",
    title: "Projects",
    icon: "i-octicon:repo",
    md: [
      {
        id: "reachout-to-all",
        title: "Reachout To All",
        file: "https://raw.githubusercontent.com/johnsmccain/reachout-to-all/main/README.md",
        icon: "i-heroicons-solid:users",
        excerpt: "Community platform for social impact and outreach programs",
        link: "https://reachouttoall.org/"
      },
      {
        id: "starknet-quest",
        title: "Starknet Quest",
        file: "https://raw.githubusercontent.com/lfglabs-dev/starknet.quest/main/README.md",
        icon: "i-heroicons-solid:lightning-bolt",
        excerpt: "Leading quests platform on Starknet to onboard next million users",
        link: "https://starknet.quest/"
      },
      {
        id: "attensys",
        title: "Attensys",
        file: "https://raw.githubusercontent.com/johnsmccain/attensys/main/README.md",
        icon: "i-heroicons-outline:clipboard-check",
        excerpt: "Advanced attendance management system with real-time tracking",
        link: "https://www.attensys.xyz/"
      },
      {
        id: "starknet-id",
        title: "Starknet.id",
        file: "https://raw.githubusercontent.com/lfglabs-dev/starknet.id/main/README.md",
        icon: "i-heroicons-solid:identification",
        excerpt: "Identity provider on Starknet - your on-chain passport",
        link: "https://starknet.id/"
      },
      {
        id: "nodeforge",
        title: "Nodeforge",
        file: "https://raw.githubusercontent.com/johnsmccain/nodeforge/main/README.md",
        icon: "i-heroicons-outline:shopping-cart",
        excerpt: "Node marketplace platform for blockchain infrastructure",
        link: "https://nodeforge.store/"
      },
      {
        id: "chain-insure",
        title: "Chain Insure",
        file: "https://raw.githubusercontent.com/johnsmccain/chain-insure/main/README.md",
        icon: "i-heroicons-solid:shield-check",
        excerpt: "Decentralized insurance platform built during Base Hackathon",
        link: "https://github.com/johnsmccain/chain-insure"
      },
      {
        id: "guild-audits",
        title: "Guild Audits",
        file: "https://raw.githubusercontent.com/johnsmccain/guild-audits/main/README.md",
        icon: "i-heroicons-solid:search-circle",
        excerpt: "Smart contract auditing platform for Web3 security",
        link: "https://github.com/johnsmccain/guild-audits"
      },
      {
        id: "by-forex",
        title: "By Forex",
        file: "https://raw.githubusercontent.com/johnsmccain/byfx/main/README.md",
        icon: "i-heroicons-solid:chart-bar",
        excerpt: "Cryptocurrency investment and staking platform on BNB Chain",
        link: "https://github.com/johnsmccain/byfx"
      }
    ]
  }
];

export default bear;
