import React from "react";
import { MacbookScrollDemo } from "../macbook";
import { Card, CardContent, Typography } from "@mui/material";
import { PlaceholdersAndVanishInputDemo } from "../placeholderinput";
import { div } from "framer-motion/client";
const Index = () => {
  return (

        <>
          <MacbookScrollDemo />
          <PlaceholdersAndVanishInputDemo/>
        </>
      
  );
};

export default Index;
