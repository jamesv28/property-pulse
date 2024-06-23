import React from "react";
import Navbar from "@/components/Navbar";
import "@/assets/styles/globals.css";
// rafce - snipet shortcut

export const metadata = {
  title: "Property Pulse | Find the best property",
  escription: "Find the best rental property",
  keywords: "rental, find rentals, find properties",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
