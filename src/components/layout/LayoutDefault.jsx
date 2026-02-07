import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import TopBar from "./TopBar";
import { useEffect, useState } from "react";
import { Slide, ToastContainer } from "react-toastify";

function LayoutDefault() {
  <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    transition={Slide}
  />;
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
