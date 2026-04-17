import { getCart } from "@/apis/cart.api";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

function useCart() {
  // Đảm bảo luôn có cart_id ngay khi Header được mount và chỉ chạy 1 lần
  const [cart_id] = useState(() => {
    let id = localStorage.getItem("cart_id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("cart_id", id);
    }
    return id;
  });
  // console.log(cart_id);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart", cart_id],
    queryFn: () => getCart(cart_id),
    enabled: !!cart_id, // chỉ gội api khi tồn tại cart_id
    // Dùng staleTime để tránh gọi API liên tục
    /*Header mount
        → gọi API cart
      Chuyển page
        → dùng lại cache
        → KHÔNG gọi API
      Trong 5 phút
        → vẫn dùng cache **/
    staleTime: 1000 * 60 * 5, // 5 phút
  });
  return { data, isLoading, isError, cart_id };
}

export default useCart;
