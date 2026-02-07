import HeroSlide from "../components/home/HeroSlide";
import CategoryList from "../components/home/CategoryList";
import ProductList from "../components/home/ProductList";
import Footer from "../components/layout/Footer";

function HomePage() {
  return (
    <>
      {/* Hero Slide */}
      <HeroSlide />

      {/* CategoryList */}
      <CategoryList />

      {/* ProductList */}
      <ProductList />
    </>
  );
}

export default HomePage;
