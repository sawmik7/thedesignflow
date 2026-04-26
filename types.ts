import { ReactNode } from "react";

export interface Project {
  id: number;
  title: string;
  cat: string;
  year: string;
  img: string;
}

export interface Feature {
  icon: ReactNode;
  text: string;
}

export interface Package {
  type: string;
  name: string;
  sub: string;
  price: string;
  time: string;
  features: Feature[];
  highlight: boolean;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
}

export interface Service {
  icon: ReactNode;
  title: string;
  desc: string;
}

// Extend Window interface for GSAP
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}