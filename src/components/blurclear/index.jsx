import { Box, Grid } from "lucide-react";
import React from "react";
import { CompareDemo } from "./Component";
const BlurClear = () => {
  return (
    <div className="bg-[#111] text-slate-200 flex flex-col md:flex-row min-h-screen">
    <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 md:p-16">
      <h1 className="text-semibold tracking-tight text-4xl md:text-6xl text-center md:text-left">
        Elevate Your Coding Journey with{" "}
        <span className="text-blue-400 whitespace-nowrap">Tech Hub</span>
      </h1>
     
      <p className="text-semibold -tracking-tighter text-md md:text-md pt-8 text-neutral-400 text-left md:text-left">
        We are a growing community of passionate student coders from{" "}
        <span className="font-extrabold text-blue-500 whitespace-nowrap text-lg">
          Behala Government Polytechnic
        </span>
        . At Tech Hub, we come together to learn, collaborate, and innovate
        in the world of technology.
      </p>
     
    </div>
    <div className="w-full md:w-1/2 h-80 md:h-screen">
      <img
        src="https://cdn.dribbble.com/userupload/14572539/file/original-f8068a9b6ddef20464e34e6d2ff4d8d0.gif"
        alt="modern"
        className="object-cover w-full h-full"
      />
    </div>
  </div>
  );
};

export default BlurClear;
