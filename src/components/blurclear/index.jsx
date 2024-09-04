import { Box, Grid } from "lucide-react";
import React from "react";
import { CompareDemo } from "./Component";
const BlurClear = () => {
  return (
    <div style={{ display: "flex" }}>
      <CompareDemo />
      <CompareDemo />
    </div>
    // <CompareDemo/>
  );
};

export default BlurClear;
