import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Checkout() {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  // Lấy tỉnh/thành phố
  const { data: provinces = [] } = useQuery({
    queryKey: ["provinces"],
    queryFn: async () => {
      const { data } = await axios.get("https://provinces.open-api.vn/api/p/");
      return data;
    },
  });

  // Lấy quận/huyện
  const { data: districts = [] } = useQuery({
    queryKey: ["districts", selectedProvince],
    queryFn: async () => {
      if (!selectedProvince) return [];
      const { data } = await axios.get(
        `https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`
      );
      return data.districts || [];
    },
    enabled: !!selectedProvince,
    onSuccess: () => {
      setSelectedDistrict("");
      setSelectedWard("");
    },
  });

  // Lấy phường/xã
  const { data: wards = [] } = useQuery({
    queryKey: ["wards", selectedDistrict],
    queryFn: async () => {
      if (!selectedDistrict) return [];
      const { data } = await axios.get(
        `https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`
      );
      return data.wards || [];
    },
    enabled: !!selectedDistrict,
    onSuccess: () => {
      setSelectedWard("");
    },
  });

  return (
    <div className="mx-auto section-container">
      <div className="grid grid-cols-2">
        <div>
          {/* ... phần header và thông tin cá nhân ... */}

          {/* Form chọn địa chỉ */}
          <div className="grid grid-cols-3 gap-4 my-[15px]">
            {/* Tỉnh/Thành phố */}
            <div className="relative">
              <select
                className="w-full border border-[#d9d9d9] rounded-[4px] py-[14px] pr-[40px] pl-[26px] focus:outline-[#338dbc]"
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                required
              >
                <option value="">Chọn Tỉnh/Thành</option>
                {provinces.map((province) => (
                  <option key={province.code} value={province.code}>
                    {province.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Quận/Huyện */}
            <div className="relative">
              <select
                className="w-full border border-[#d9d9d9] rounded-[4px] py-[14px] pr-[40px] pl-[26px] focus:outline-[#338dbc] disabled:bg-gray-100"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                disabled={!selectedProvince}
                required
              >
                <option value="">Chọn Quận/Huyện</option>
                {districts.map((district) => (
                  <option key={district.code} value={district.code}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Phường/Xã */}
            <div className="relative">
              <select
                className="w-full border border-[#d9d9d9] rounded-[4px] py-[14px] pr-[40px] pl-[26px] focus:outline-[#338dbc] disabled:bg-gray-100"
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                disabled={!selectedDistrict}
                required
              >
                <option value="">Chọn Phường/Xã</option>
                {wards.map((ward) => (
                  <option key={ward.code} value={ward.code}>
                    {ward.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ... phần còn lại ... */}
        </div>
        <div>side bar</div>
      </div>
    </div>
  );
}

export default Checkout;