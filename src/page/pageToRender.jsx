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
const PageToRender = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <div>
       {navOpen ? (
        <HoverImageLinks/>
      ) : ( 
        <>
          <CardDemo />
          <HorizontalScrollCarousel />
          <Footer />
          {/* <ImageGenerator /> */}
          {/* <MacbookScrollDemo/> */}
        </>
      )}
    </div>
  );
};

export default PageToRender;
