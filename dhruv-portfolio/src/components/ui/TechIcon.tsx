import { IconType } from "react-icons";
import {
  SiPython,
  SiPostgresql,
  SiFastapi,
  SiDocker,
  SiReact,
  SiJavascript,
  SiNodedotjs,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiOpencv,
  SiNumpy,
  SiPandas,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiMongodb,
  SiExpress,
  SiSocketdotio,
  SiRedis,
  SiGooglecloud,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiJupyter,
  SiKeras,
  SiFlask,
  SiDjango,
  SiMysql,
  SiHtml5,
  SiCss,
  SiJenkins,
  SiJira,
  SiFigma,
  SiPostman,
  SiNginx,
  SiKubernetes,
  SiGraphql,
  SiFirebase,
  SiVercel,
  SiNetlify,
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import { BiLogoGoLang } from "react-icons/bi";
import { TbApi, TbBrandCpp, TbBrandVscode, TbBrandAzure, TbBrandAws } from "react-icons/tb";

// Simple Icons for SAP - exact brand logo
import { SiSap } from "@icons-pack/react-simple-icons";

// ============================================================================

// Comprehensive mapping of technology names to their corresponding React Icons
const iconMap: Record<string, IconType> = {
  // Programming Languages
  python: SiPython,
  javascript: SiJavascript,
  typescript: SiTypescript,
  java: DiJava,
  go: BiLogoGoLang,
  golang: BiLogoGoLang,
  "c++": TbBrandCpp,
  cpp: TbBrandCpp,

  // Frameworks & Libraries - Backend
  fastapi: SiFastapi,
  "fast api": SiFastapi,
  flask: SiFlask,
  django: SiDjango,
  "node.js": SiNodedotjs,
  nodejs: SiNodedotjs,
  node: SiNodedotjs,
  express: SiExpress,
  "express.js": SiExpress,
  expressjs: SiExpress,

  // Frameworks & Libraries - Frontend
  "react.js": SiReact,
  react: SiReact,
  reactjs: SiReact,
  "next.js": SiNextdotjs,
  nextjs: SiNextdotjs,
  next: SiNextdotjs,
  tailwindcss: SiTailwindcss,
  tailwind: SiTailwindcss,
  "tailwind css": SiTailwindcss,
  html5: SiHtml5,
  html: SiHtml5,
  css3: SiCss,
  css: SiCss,

  // Databases
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  mongodb: SiMongodb,
  mongo: SiMongodb,
  mysql: SiMysql,
  redis: SiRedis,
  pgvector: SiPostgresql, // using postgres icon for pgvector

  // AI/ML & Data Science
  tensorflow: SiTensorflow,
  pytorch: SiPytorch,
  "scikit-learn": SiScikitlearn,
  sklearn: SiScikitlearn,
  opencv: SiOpencv,
  cv2: SiOpencv,
  numpy: SiNumpy,
  pandas: SiPandas,
  keras: SiKeras,
  yolov8: SiOpencv, // using OpenCV icon for YOLO variants
  yolo: SiOpencv,
  mediapipe: SiOpencv, // using OpenCV for computer vision libraries
  resnet50: SiTensorflow, // using TensorFlow for deep learning models
  resnet: SiTensorflow,
  nlp: SiPython, // using Python for NLP (natural language processing)
  beautifulsoup: SiPython, // using Python icon for BeautifulSoup

  // Cloud & DevOps
  docker: SiDocker,
  aws: TbBrandAws,
  azure: TbBrandAzure,
  gcp: SiGooglecloud,
  "google cloud": SiGooglecloud,
  "google adk": SiGooglecloud, // Google ADK (Android Development Kit)
  kubernetes: SiKubernetes,
  k8s: SiKubernetes,
  nginx: SiNginx,
  jenkins: SiJenkins,
  vercel: SiVercel,
  netlify: SiNetlify,
  firebase: SiFirebase,

  // Real-time & APIs
  "socket.io": SiSocketdotio,
  socketio: SiSocketdotio,
  "rest api": TbApi,
  restapi: TbApi,
  api: TbApi,
  graphql: SiGraphql,
  jwt: TbApi, // using generic API icon for JWT

  // Tools & Others
  git: SiGit,
  github: SiGithub,
  "github actions": SiGithubactions,
  githubactions: SiGithubactions,
  vscode: TbBrandVscode,
  jupyter: SiJupyter,
  jira: SiJira,
  figma: SiFigma,
  postman: SiPostman,

  // SAP - from Simple Icons (exact brand logo) - using suppressHydrationWarning to prevent mismatch warning
  sap: (props) => <SiSap suppressHydrationWarning {...props} />,
  "sap abap": (props) => <SiSap suppressHydrationWarning {...props} />,
  abap: (props) => <SiSap suppressHydrationWarning {...props} />,
};

interface TechIconProps {
  name: string;
  className?: string;
}

/**
 * TechIcon component that displays technology logos using react-icons
 * Falls back to CoreUI icons for brands not available in react-icons
 * Returns null if icon is not found (allowing text-only display)
 * Responsive sizing for better mobile/tablet/desktop experience
 */
export function TechIcon({
  name,
  className = "h-4 w-4 sm:h-5 sm:w-5",
}: TechIconProps) {
  // Normalize the name to lowercase and handle common variations
  const normalizedName = name.toLowerCase().trim().replace(/\s+/g, ' ');

  // Get the icon component from the icon map
  const IconComponent = iconMap[normalizedName];

  // If icon not found, return null (parent component should handle text-only display)
  if (!IconComponent) {
    return null;
  }

  return <IconComponent className={className} aria-label={name} />;
}

export default TechIcon;
