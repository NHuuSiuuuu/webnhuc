import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router";
function HeroSide() {
  var settings = {
    dots: false, // hiện dấu ...
    infinite: true, // có lặp hay không
    speed: 500, // Tốc độ animation
    slidesToShow: 1, // Hiện mấy slide
    slidesToScroll: 1, // Nhảy mấy slide

    // autoplay: true, // Bật auto
    autoplaySpeed: 5000, // 5s đổi slide
    cssEase: "linear",
  };
  return (
    <div className="relative slider-container">
      <Slider {...settings}>
        <div>
          <Link to="">
            <img
              src="https://cdn.hstatic.net/1000321269/file/banner_shopee__1__70b2c5c0497c414d803974a096108d69.png"
              alt=""
            />
          </Link>
        </div>
        <div>
          <Link to="">
            <img
              src="https://cdn.hstatic.net/1000321269/file/4_38e4d6063822418887fbf0db4e9a19e7.png"
              alt=""
            />
          </Link>
        </div>
        <div>
          <Link to="">
            <img
              src="https://cdn.hstatic.net/1000321269/file/banner_shopee_fa461afda7ed4057a831b2c5583ac427.png"
              alt=""
            />
          </Link>
        </div>
      </Slider>
    </div>
  );
}
export default HeroSide;
