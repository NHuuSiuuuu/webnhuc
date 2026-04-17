import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import TopBar from "./TopBar";
import { useEffect, useState } from "react";
import { Slide, ToastContainer } from "react-toastify";
import Chatbot from "./Chatbot";

function LayoutDefault() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const isScroller = window.scrollY > 60;
      setScrolled((prev) => (prev !== isScroller ? isScroller : prev)); //Scroll chạy trước → JS chạy sau ko dùng thì ngược lại
      console.log(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
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
      />

      {/* Top Bar */}
      <TopBar hidden={scrolled} />

      {/* Header */}
      <Header active={scrolled} />

      <Outlet />
      <Chatbot />

      <Footer />
    </>
  );
}

export default LayoutDefault;
