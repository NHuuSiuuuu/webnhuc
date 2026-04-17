import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function useAddressSelector() {
  const [selectedProvinceCode, setSelectedProvinceCode] = useState("");
  const [selectedDistrictCode, setSelectedDistrictCode] = useState("");
  const [selectedWardCode, setSelectedWardCode] = useState("");

  const [selectedProvinceName, setSelectedProvinceName] = useState("");
  const [selectedDistrictName, setSelectedDistrictName] = useState("");
  const [selectedWardName, setSelectedWardName] = useState("");
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

  return {
    selectedProvinceCode,
    setSelectedProvinceCode,
    selectedDistrictCode,
    setSelectedDistrictCode,
    selectedWardCode,
    setSelectedWardCode,
    selectedProvinceName,
    selectedDistrictName,
    selectedWardName,
    provinces,
    districts,
    wards,
  };
}
