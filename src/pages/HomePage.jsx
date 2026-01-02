import TopBar from "../components/layout/TopBar";
import Header from "../components/layout/Header";
import HeroSlide from "../components/home/HeroSlide";
import CategoryList from "../components/home/CategoryList";
import ProductList from "../components/home/ProductList";
import Footer from "../components/layout/Footer";
import { useEffect, useState } from "react";

function HomePage() {
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

      {/* Hero Slide */}
      <HeroSlide />

      {/* CategoryList */}
      <CategoryList />

      {/* ProductList */}
      <ProductList />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default HomePage;
