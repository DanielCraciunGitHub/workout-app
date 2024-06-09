import { BsDiscord, BsGithub, BsLinkedin, BsTwitterX } from "react-icons/bs"

import { NavItem, SocialLink } from "../types"

export const siteConfig = {
  email: "email",
  url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : `https://workout-app-red.vercel.app`,
  navLinks: [
    {
      name: "Volume Tracker",
      href: "/",
    },
    {
      name: "Dashboard",
      href: "/dashboard",
    },
  ] satisfies NavItem[],
  socialLinks: [
    {
      href: "https://discord.gg/C2PXBMqpuV",
      name: "Discord.gg",
      icon: <BsDiscord />,
    },
    {
      href: "https://github.com/DanielCraciunGitHub",
      name: "Github.com",
      icon: <BsGithub />,
    },
    {
      href: "https://www.linkedin.com/in/dcraciun07/",
      name: "Linkedin.com",
      icon: <BsLinkedin />,
    },
    {
      href: "https://x.com/craciun_07",
      name: "X.com",
      icon: <BsTwitterX />,
    },
  ] as const satisfies SocialLink[],
  footerText:
    "© 2024 Volume Tracker. All Rights Reserved" as const satisfies string,
} as const

export const exerciseConfig = {
  muscles: [
    { muscleName: "abdominals", size: "small" },
    { muscleName: "abductors", size: "small" },
    { muscleName: "adductors", size: "small" },
    { muscleName: "biceps", size: "small" },
    { muscleName: "calves", size: "small" },
    { muscleName: "chest", size: "big" },
    { muscleName: "forearms", size: "small" },
    { muscleName: "glutes", size: "big" },
    { muscleName: "hamstrings", size: "big" },
    { muscleName: "lats", size: "big" },
    { muscleName: "lower_back", size: "small" },
    { muscleName: "middle_back", size: "big" },
    { muscleName: "neck", size: "small" },
    { muscleName: "quadriceps", size: "big" },
    { muscleName: "traps", size: "big" },
    { muscleName: "triceps", size: "small" },
    { muscleName: "shoulders", size: "small" },
  ] satisfies Array<{ muscleName: string; size: "big" | "small" }>,
} as const
