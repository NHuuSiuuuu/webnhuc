import {
  faChevronRight,
  faHandHolding,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { calculateDiscountedPrice, formatPrice } from "../../utils/price";
import { faCreditCard, faMoneyBill } from "@fortawesome/free-solid-svg-icons";

// Trong component Checkout

function Checkout() {
  const navigate = useNavigate();
  const [selectedProvinceCode, setSelectedProvinceCode] = useState("");
  const [selectedDistrictCode, setSelectedDistrictCode] = useState("");
  const [selectedWardCode, setSelectedWardCode] = useState("");

  const [selectedProvinceName, setSelectedProvinceName] = useState("");
  const [selectedDistrictName, setSelectedDistrictName] = useState("");
  const [selectedWardName, setSelectedWardName] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("");
  const [fee, setFee] = useState(null);
  const [freeThreshold, setFreeThreshold] = useState(null);
  const cart_id = localStorage.getItem("cart_id");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    shippingMethod: "",
    paymentMethod: "",
  });

  const fetchCart = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BACKEND}/cart/get`,
      {
        cart_id,
      },
    );
    return res.data.cart;
  };
  const {
    data: carts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cart", cart_id],
    queryFn: fetchCart,
    enabled: !!cart_id, // chỉ gội api khi tồn tại cart_id
  });

  // Gửi data lên db
  const {
    mutate,
    isError: errorCreateOrder,
    isPending,
  } = useMutation({
    mutationFn: async (payload) => {
      return await axios.post(
        `${import.meta.env.VITE_API_BACKEND}/order/create`,
        payload,
      );
    },
    onSuccess: (res) => {
      console.log(res.data.payment);
      if (res.data.payment === "vnpay") {
        window.location.href = res.data.vnpayResponse;
      } else {
        navigate(`/orders/success/${res.data.order._id}`);
      }

      // navigate(`/orders/success/${res.data.order._id}`);
    },
  });

  const { data: shippingMethod = [] } = useQuery({
    queryKey: ["shippingMethod"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BACKEND}/shipping-method/index`,
      );
      return data.data;
    },
  });

  // Lấy tỉnh
  const { data: provinces = [] } = useQuery({
    queryKey: ["provinces"],
    queryFn: async () => {
      const { data } = await axios.get(`https://provinces.open-api.vn/api/p/`);
      return data;
    },
  });
  useEffect(() => {
    if (selectedProvinceCode && provinces.length > 0) {
      const province = provinces.find((p) => p.code == selectedProvinceCode);
      if (province) setSelectedProvinceName(province.name);
    }
  }, [selectedProvinceCode, provinces]);

  // Lấy quận huyện
  const { data: districts = [] } = useQuery({
    queryKey: ["districts", selectedProvinceCode],
    queryFn: async () => {
      if (!selectedProvinceCode) return [];
      const { data } = await axios.get(
        `https://provinces.open-api.vn/api/p/${selectedProvinceCode}?depth=2`,
      );
      return data.districts || [];
    },
    enabled: !!selectedProvinceCode,
    onSuccess: () => {
      setSelectedDistrictCode("");
      setSelectedWardCode("");
    },
  });
  useEffect(() => {
    if (selectedDistrictCode && districts.length > 0) {
      const district = districts.find((p) => p.code == selectedDistrictCode);
      if (district) setSelectedDistrictName(district.name);
    }
  }, [selectedDistrictCode, districts]);

  // Lấy phường xã
  const { data: wards = [] } = useQuery({
    queryKey: ["wards", selectedDistrictCode],
    queryFn: async () => {
      if (!selectedDistrictCode) return [];
      const { data } = await axios.get(
        `https://provinces.open-api.vn/api/d/${selectedDistrictCode}?depth=2`,
      );
      return data.wards || [];
    },
    enabled: !!selectedDistrictCode,
    onSuccess: () => {
      setSelectedWardCode("");
    },
  });

  useEffect(() => {
    if (selectedWardCode && wards.length > 0) {
      const ward = wards.find((p) => p.code == selectedWardCode);
      if (ward) setSelectedWardName(ward.name);
    }
  }, [selectedWardCode, wards]);

  const provisionalPrice = carts?.products?.reduce((acc, curr) => {
    return (
      Number(acc) +
      calculateDiscountedPrice(
        curr.product_id.price,
        curr.product_id.discountPercentage,
      ) *
        curr.quantity
    );
  }, 0);

  useEffect(() => {
    if (!selectedShippingMethod) return;

    const method = shippingMethod.find(
      (item) => item.code === selectedShippingMethod,
    );
    if (!method) return;

    if (
      method.freeThreshold != null &&
      provisionalPrice >= method.freeThreshold
    ) {
      setFee(0);
    } else {
      setFee(method.fee);
    }
    console.log("method", method);
  }, [selectedShippingMethod, provisionalPrice, shippingMethod]);

  if (isLoading) return <div>Đang loading ...</div>;
  if (isError) return <div>lỗi</div>;
  const payload = {
    cart_id,
    customer: {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      note: form.note,
      address: {
        detail: form.detail,
        ward: selectedWardName,
        district: selectedDistrictName,
        province: selectedProvinceName,
      },
      shippingMethod: selectedShippingMethod,
      paymentMethod: paymentMethod,
    },
  };

  const handleClickShippingMethod = (item) => {
    setSelectedShippingMethod(item.code);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(payload);
  };
  // console.log("cart", carts);

  // console.log(selectedDistrictCode);
  console.log("form", payload);
  // console.log("paymentMethod", paymentMethod);
  console.log("shippingMethod", shippingMethod);
  // console.log("feee", fee);
  // console.log("provisionalPrice", selectedShippingMethod);
  return (
    <div className="mx-auto h-[1000px] w-[90%] lg:w-[70%]">
      <div className="flex-3 md:flex md:flex-1 my-[20px] border-b border-[#e6e6e6] border-solid justify-start items-center px-[15px]">
        {/* Logo */}
        <Link to="/" className="block text-[40px]">
          NHUU
        </Link>
      </div>

      <div>
        <ul>
          <li className="inline-block">
            <Link className="text-[#338dbc]" to="/cart">
              Giỏ hàng
            </Link>
          </li>
          <li className="inline-block mx-[10px]">
            <FontAwesomeIcon
              className="text-[#999999] text-[10px]"
              icon={faChevronRight}
            />
          </li>
          <li className="text-black inline-block text-[12px]">
            Thông tin giao hàng
          </li>
          <li className="py-[16px] text-[#4d4d4d] text-[12px] font-medium">
            <h2 className="text-[18px] text-[#333333]">Thông tin giao hàng</h2>
          </li>
        </ul>
        <p className="text-[#737373] text-[14px] inline-block">
          Bạn đã có tài khoản?
        </p>
        <Link
          className="text-[#338dbc] text-[14px] inline-block mx-[6px]"
          to="account/login"
        >
          Đăng nhập
        </Link>
      </div>
      <div className="grid lg:grid-cols-2">
        <div className="lg:pt-[56px] lg:pr-[66px] order-2 lg:order-1">
          <div>
            {/* Form fields */}
            <div className="relative shadow-2xs my-[15px] shadow-2xs">
              <input
                type="text"
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder="Họ và tên"
                className="w-full peer border border-[#d9d9d9] rounded-[4px] py-[14px] pr-[40px] pl-[26px] focus:outline-[#338dbc] focus:placeholder-transparent"
              />
              <label className="text-[#333333] pointer-events-none font-medium left-[22px] peer-focus:-translate-y-1/2 px-[4px] translate-y-1/2 bg-white transition-all duration-200 opacity-0 peer-focus:opacity-100 absolute peer-not-placeholder-shown:-translate-y-1/2 peer-not-placeholder-shown:opacity-100">
                Họ và tên
              </label>
            </div>

            <div className="flex w-full gap-2">
              <div className="relative shadow-2xs my-[15px] w-[60%]">
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="z-50 w-full peer border border-[#d9d9d9] rounded-[4px] py-[14px] pr-[40px] pl-[26px] focus:outline-[#338dbc] focus:placeholder-transparent"
                />
                <label className=" pointer-events-none z-10 text-[#333333] font-medium left-[22px] peer-focus:-translate-y-1/2 px-[4px] translate-y-1/2 bg-white transition-all duration-200 opacity-0 peer-focus:opacity-100 absolute peer-not-placeholder-shown:-translate-y-1/2 peer-not-placeholder-shown:opacity-100">
                  Email
                </label>
              </div>

              <div className="relative shadow-2xs my-[15px] w-[40%]">
                <input
                  type="text"
                  placeholder="Số điện thoại"
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full peer border border-[#d9d9d9] rounded-[4px] py-[14px] pr-[40px] pl-[26px] focus:outline-[#338dbc] focus:placeholder-transparent"
                />
                <label className=" pointer-events-none text-[#333333] font-medium left-[22px] peer-focus:-translate-y-1/2 px-[4px] translate-y-1/2 bg-white transition-all duration-200 opacity-0 peer-focus:opacity-100 absolute peer-not-placeholder-shown:-translate-y-1/2 peer-not-placeholder-shown:opacity-100">
                  Số điện thoại
                </label>
              </div>
            </div>

            <div className="relative shadow-2xs my-[15px]">
              <input
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                type="text"
                placeholder="Ghi chú"
                className="w-full peer border border-[#d9d9d9] rounded-[4px] py-[14px] pr-[40px] pl-[26px] focus:outline-[#338dbc] focus:placeholder-transparent"
              />
              <label className=" pointer-events-none text-[#333333] font-medium left-[22px] peer-focus:-translate-y-1/2 px-[4px] translate-y-1/2 bg-white transition-all duration-200 opacity-0 peer-focus:opacity-100 absolute peer-not-placeholder-shown:-translate-y-1/2 peer-not-placeholder-shown:opacity-100">
                Ghi chú
              </label>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-[15px]">
              {/* Tỉnh */}
              <div className="relative shadow-2xs">
                <select
                  value={selectedProvinceCode}
                  onChange={(e) => setSelectedProvinceCode(e.target.value)}
                  className="w-full px-4 py-3.5 border border-gray-300 rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                    appearance-none bg-white text-gray-700 cursor-pointer
                    hover:border-gray-400 transition-colors duration-200"
                >
                  <option value="" className="text-gray-400">
                    Chọn tỉnh/thành
                  </option>
                  {provinces.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Huyện*/}
              <div className="relative shadow-2xs">
                <select
                  value={selectedDistrictCode}
                  onChange={(e) => setSelectedDistrictCode(e.target.value)}
                  disabled={!selectedProvinceCode}
                  className={`w-full px-4 py-3.5 border rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                    appearance-none text-gray-700 cursor-pointer transition-colors duration-200
                    ${
                      !selectedProvinceCode
                        ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white border-gray-300 hover:border-gray-400"
                    }`}
                >
                  <option value="" className="text-gray-400">
                    Chọn quận/huyện
                  </option>
                  {districts.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* xã */}
              <div className="relative shadow-2xs">
                <select
                  value={selectedWardCode}
                  onChange={(e) => setSelectedWardCode(e.target.value)}
                  disabled={!selectedDistrictCode}
                  className={`w-full px-4 py-3.5 border rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                    appearance-none text-gray-700 cursor-pointer transition-colors duration-200
                    ${
                      !selectedDistrictCode
                        ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white border-gray-300 hover:border-gray-400"
                    }`}
                >
                  <option value="" className="text-gray-400">
                    Chọn phường/xã
                  </option>
                  {wards.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {/* Địa chỉ cụ thể */}
            <div className="relative shadow-2xs my-[15px]">
              <input
                onChange={(e) => setForm({ ...form, detail: e.target.value })}
                type="text"
                placeholder="Chi tiết"
                className="w-full peer border border-[#d9d9d9] rounded-[4px] py-[14px] pr-[40px] pl-[26px] focus:outline-[#338dbc] focus:placeholder-transparent"
              />
              <label className=" pointer-events-none text-[#333333] font-medium left-[22px] peer-focus:-translate-y-1/2 px-[4px] translate-y-1/2 bg-white transition-all duration-200 opacity-0 peer-focus:opacity-100 absolute peer-not-placeholder-shown:-translate-y-1/2 peer-not-placeholder-shown:opacity-100">
                Chi tiết
              </label>
            </div>

            {/* Phương thức vận chuyển */}
            <h2 className="mb-[20px] text-[18px] text-[#333333]">
              Phương thức vận chuyển
            </h2>
            {/* {!selectedWardCode ? (
              <div>
                <div className="w-full h-[250px] flex  items-center justify-center border border-[#d9d9d9] rounded-[4px]">
                  <div className="flex flex-col items-center justify-center ">
                    <div className="">
                      {" "}
                      <FontAwesomeIcon
                        className="text-[#d9d9d9] text-[50px] "
                        icon={faTruck}
                      />
                    </div>
                    {!selectedProvinceCode ? (
                      <p className="text-[14px] text-[#737373]">
                        Vui lòng chọn tỉnh / thành để có danh sách phương thức
                        vận chuyển.
                      </p>
                    ) : (
                      <p className="text-[14px] text-[#737373]">
                        Vui lòng chọn quận / huyện để có danh sách phương thức
                        vận chuyển.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : ( */}

            {shippingMethod?.map((item) => (
              <div
                key={item.code}
                className={` flex items-center justify-between  p-4 mb-3 border-2 rounded-lg transition-all duration-200  cursor-pointer group
                          ${
                            selectedShippingMethod === item.code
                              ? "border-blue-500 bg-blue-50" // Khi được chọn
                              : "border-gray-200 bg-white hover:border-blue-400 " // Khi hover (không chọn)
                          }`}
                onClick={() => {
                  handleClickShippingMethod(item);
                }}
              >
                {/* Left side */}
                <div className="flex items-center space-x-4">
                  {/* Info */}
                  <div>
                    <p
                      className={`text-sm font-medium transition-colors duration-200`}
                    >
                      {item?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item?.deliveryTime}
                    </p>
                  </div>
                </div>

                {/* Right side - Price */}
                <div className="text-right">
                  <p
                    className={`text-sm font-semibold transition-colors duration-200`}
                  >
                    {formatPrice(item?.fee)}
                  </p>
                  <p className="text-xs text-green-600">
                    {item?.freeThreshold
                      ? `Free từ ${formatPrice(item?.freeThreshold)}`
                      : "Có phí"}
                  </p>
                </div>
              </div>
            ))}
            {/* )} */}

            {/* Phương thức thanh toán */}
            <div className="mt-8">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Phương thức thanh toán
              </h2>

              <div className="space-y-3">
                <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <label
                    htmlFor="cod"
                    className="flex items-center ml-3 cursor-pointer"
                  >
                    <FontAwesomeIcon
                      icon={faMoneyBill}
                      className="mr-2 text-gray-600"
                    />
                    <span className="text-sm">
                      Thanh toán khi nhận hàng (COD)
                    </span>
                  </label>
                </div>

                <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                  <input
                    type="radio"
                    id="vnpay"
                    name="paymentMethod"
                    value="vnpay"
                    checked={paymentMethod === "vnpay"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <label
                    htmlFor="vnpay"
                    className="flex items-center ml-3 cursor-pointer"
                  >
                    <FontAwesomeIcon
                      icon={faCreditCard}
                      className="mr-2 text-gray-600"
                    />
                    <span className="text-sm">Thanh toán qua VNPAY</span>
                  </label>
                </div>
              </div>
            </div>
            {/* Hiển thị thêm thông tin nếu chọn VNPAY */}
            {paymentMethod === "vnpay" && (
              <div className="p-4 mt-3 text-sm text-blue-800 rounded-lg bg-blue-50">
                <p className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Bạn sẽ được chuyển đến cổng thanh toán VNPAY sau khi đặt hàng
                </p>
              </div>
            )}

            <div className="flex space-x-4  my-[15px]">
              <button className="flex items-center justify-center px-6 py-3 text-gray-700 transition-all duration-200 border border-gray-300 rounded-md hover:border-gray-400 hover:shadow-sm">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Giỏ hàng
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center justify-center px-8 py-3 font-medium text-white transition-all duration-200 bg-[#333333] rounded-md  hover:shadow-lg"
              >
                Hoàn tất đơn hàng
              </button>
            </div>
          </div>
        </div>

        <div className="lg:pt-[56px] lg:pl-[44px] lg:order-2 lg:bg-[#fafafa]">
          {/* Sản phẩm */}
          <div className="mt-[50px]">
            <table className="w-full">
              <tbody>
                {carts?.products?.map((item) => {
                  const size = item.product_id.sizes.find(
                    (s) => s._id === item.size_id,
                  );
                  return (
                    <tr
                      key={item.product_id._id}
                      className="border-b-[#bcbcbc] border-b-[1px] border-dotted"
                    >
                      <td className="p-[10px] w-[100px]">
                        <a href="/" className="block">
                          <div className="aspect-[3/4] overflow-hidden border border-[#ededed]">
                            <img
                              className="md:w-full md:h-full    w-[90px] border-solid border-[#ededed] md:mr-[10px] object-cover overflow-hidden"
                              src={item.product_id?.thumbnail[0]}
                              alt={item.product_id?.title}
                            />
                          </div>
                        </a>
                      </td>
                      <td className="p-[10px] md:p-[25px] relative">
                        <Link
                          to={``}
                          href="/"
                          className="float-left w-full text-[13px] font-semibold uppercase text-[#a47b67]"
                        >
                          {item.product_id?.title}
                        </Link>
                        {/* Size */}
                        <span className="text-[12px] float-end w-full mt-[5px] mb-3 uppercase">
                          {size?.name}
                        </span>
                        {/* Số lượng */}
                        <span className="float-left w-auto bg-[#ededed] text-center px-3 py-[6px] text-[12px] mr-3 inline-block">
                          {item?.quantity}
                        </span>
                        {/* Giá */}
                        <span className="block float-right leading-[26px] text-[#a47b67] font-medium opacity-70">
                          {formatPrice(
                            item?.quantity *
                              calculateDiscountedPrice(
                                item?.product_id?.price,
                                item?.product_id?.discountPercentage,
                              ),
                          )}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Coupon Section */}
            <div className="relative flex space-x-2">
              <input
                type="text"
                placeholder="Mã giảm giá"
                className="w-full peer border border-[#d9d9d9] rounded-[4px] py-[14px] pr-[40px] pl-[26px] focus:outline-[#338dbc] focus:placeholder-transparent"
              />
              <label className="text-[#333333] font-medium left-[22px] peer-focus:-translate-y-1/2 px-[4px] translate-y-1/2 bg-white transition-all duration-200 opacity-0 peer-focus:opacity-100 absolute peer-not-placeholder-shown:-translate-y-1/2 peer-not-placeholder-shown:opacity-100">
                Mã giảm giá
              </label>
              <button className="px-6 py-3 text-sm font-medium text-white transition-colors bg-gray-800 rounded-lg hover:bg-black whitespace-nowrap">
                Áp dụng
              </button>
            </div>

            {/* Tổng tiền thanh toán */}
            <div className="p-6 ">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Tổng thanh toán
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tạm tính</span>
                  <span className="font-medium text-gray-800">
                    {formatPrice(provisionalPrice)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Phí vận chuyển</span>
                  <span className="font-medium text-gray-800">
                    {formatPrice(fee)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Giảm giá</span>
                  <span className="font-medium text-green-600">-0₫</span>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-800">
                      Tổng cộng
                    </span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-amber-700">
                        {formatPrice(provisionalPrice + fee)}
                      </div>
                      <div className="text-xs text-gray-500">
                        Đã bao gồm VAT
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
