import HeroSlide from "../components/home/HeroSlide";
import CategoryList from "../components/home/CategoryList";
import ProductList from "../components/home/ProductList";
import Footer from "../components/layout/Footer";

function HomePage() {
  return (
    <>
      {/* Top Bar */}
      {/* <TopBar hidden={scrolled} /> */}

      {/* Header */}
      {/* <Header active={scrolled} /> */}

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
