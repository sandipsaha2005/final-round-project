import React from "react";
import ImageGenerator from "../components/text-to-image";
import { CardDemo } from "../components/Card/App";
import Footer from "../components/Footer/App";
import HorizontalScrollCarousel from "../components/HorizentralScroll/app";
import { useState } from "react";
// import { ScrollBar  } from "../components/navbar";
import MenuIcon from "@mui/icons-material/Menu";
import NavbarDemo from "../components/organs/Navbar";
import { HoverImageLinks } from "../components/newNavbar";
import { MacbookScrollDemo } from "../components/macbook";
import Index from "../components/generate-image-guide";
const PageToRender = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
       {navOpen ? (
        <HoverImageLinks/>
      ) : ( 
        <>
          <CardDemo />
          <HorizontalScrollCarousel />
          <Index/>
          {/* <Footer /> */}
          {/* <ImageGenerator /> */}  
          {/* <MacbookScrollDemo/> */}
        </>
      )}
    </div>
  );
};

export default PageToRender;
