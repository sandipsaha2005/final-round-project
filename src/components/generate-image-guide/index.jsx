import React from "react";
import { MacbookScrollDemo } from "../macbook";
import { Card, CardContent, Typography } from "@mui/material";
import { PlaceholdersAndVanishInputDemo } from "../placeholderinput";
const Index = () => {
  return (
    <Card
 className='bg-black'
      elevation={6}
      sx={{
        boxShadow: "0px 3px 10px rgba(255, 0, 0, 0.5)", // Red shadow with 50% opacity
        // margin: "20px",
        width:'100%',
        display: "flex",
        justifyContent: "center", // Center content horizontally
        alignItems: "center",
        flexDirection:'column',
        

      }}
    >
        <CardContent sx={{width:'100%'}}>
        <MacbookScrollDemo />
        <PlaceholdersAndVanishInputDemo/>
        
        </CardContent>
        <CardContent sx={{width:'100%'}}>
       
    
        </CardContent>
      
    </Card>
  );
};

export default Index;
