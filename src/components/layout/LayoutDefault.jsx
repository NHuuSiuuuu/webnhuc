import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import TopBar from "./TopBar";
import { useEffect, useState } from "react";

function LayoutDefault() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (Math.floor(scrollY) >= 60) {
        setScrolled(true);
        console.log("hahah");
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <>
      {/* Top Bar */}
      <TopBar hidden={scrolled} />

      {/* Header */}
      <Header active={scrolled} />

      <Outlet />

      <Footer />
    </>
  );
}

export default LayoutDefault;
