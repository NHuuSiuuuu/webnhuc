import TopBar from "../components/layout/TopBar";
import Header from "../components/layout/Header";
import HeroSlide from "../components/home/HeroSlide";
import CategoryList from "../components/home/CategoryList";
import ProductList from "../components/home/ProductList";

function HomePage() {
  return (
    <>
      {/* Top Bar */}
      <TopBar />

      {/* Header */}
      <Header />

      {/* Hero Slide */}
      <HeroSlide />

      {/* CategoryList */}
      <CategoryList />

      {/* ProductList */}
      <ProductList/>
    </>
  );
}

export default HomePage;
