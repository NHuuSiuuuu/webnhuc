 export const calculateDiscountedPrice = (price, discount) => {
    if (!discount || discount <= 0) return price;

    return price * (1 - discount / 100);
  };

 export const formatPrice = (price) => {
    return new Intl.NumberFormat("vn-VN", {
      style: "currency",
      currency: "vnd",
    }).format(price);
  };

  