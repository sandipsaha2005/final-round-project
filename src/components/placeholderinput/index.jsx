"use client";

import { PlaceholdersAndVanishInput } from "./Ui";

export function PlaceholdersAndVanishInputDemo() {
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    (
        
    <div className="h-[40rem] flex flex-col justify-center  items-center px-4 dark:bg-[#0B0B0F]">
      <h2
        className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
        Enter Whatever You want to see
      </h2>
      <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={onSubmit} />
      <div className="h-[40rem] flex flex-col justify-center  items-center px-4 dark:bg-[#0B0B0F]" style={{display:'flex',justifyContent:'center'}}>
    <img height='100px' width='55%' src={'./free-images.jpg'} alt="" />
    </div>
    </div>
    
    
)
  );
}
