import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "../../../utils/axios";

import { Fragment, useEffect, useState } from "react";

function RolePermissions() {
  const queryClient = useQueryClient();
  const [permissionByRole, setPermissionByRole] = useState({});
  const PERMISSION_MATRIX = [
    {
      group: "Danh mục sản phẩm",
      prefix: "product_category",
      actions: ["view", "create", "update", "delete"],
    },
    {
      group: "Sản phẩm",
      prefix: "product",
      actions: ["view", "create", "update", "delete"],
    },
  ];

  const fetchRoles = async () => {
    const res = await axios.get("http://localhost:3001/api/roles/index");
    return res.data.data;
  };

  const fetchPermissions = async (payload) => {
    const res = await axios.patch(
      "http://localhost:3001/api/roles/permissions",
      payload,
    );
  };

  const { mutate, isPending } = useMutation({
    mutationFn: fetchPermissions,
    onSuccess: () => {
      queryClient.invalidateQueries(["roles"]);
      alert("Cập nhật thành công!");
    },
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["roles"],
    queryFn: fetchRoles,
  });
  //   Đổ quyền từ db vào state - ko có thì checkbox luôn trống
  useEffect(() => {
    if (!data) return;

    const initPermission = {};
    data.forEach((role) => {
      /* Gán value theo key động. Khi chạy xong nó sẽ như này
       initPermissions = {
       "6970e4b7a256f3df7e634104": ["product_view", "product_edit"]
       }
      */
      initPermission[role._id] = role.permissions || [];
    });
    setPermissionByRole(initPermission);
  }, [data]);

  const handleOnChange = (roleId, permission) => {
    setPermissionByRole((prev) => {
      //Giảithich dòng 34: roleId = "123456789";
      // Thì prev[roleId] = ["product_view", "product_edit"];
      //   permission hiện tại : ["product_view", "product_edit"]
      const currentPermission = prev[roleId] || []; // || [] là bảo hiểm

      //   Kiểm tra xem quyền này đã có chưa
      // Nếu có rồi thì bỏ quyền đấy ra, chưa có thì thêm vào
      const isChecked = currentPermission.includes(permission);

      return {
        ...prev,
        [roleId]: isChecked
          ? currentPermission.filter((p) => p !== permission) // nếu có rồi thì bỏ nó đi
          : [...currentPermission, permission],
      };
    });
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    /*
    permissionByRole = {
      "6970e4b7a256f3df7e634104": ["product_view", "product_create"],
      "6971f3d8399f2db6cf3caf48": ["product_view"],
    };
    Object.keys(permissionByRole) trả về mảng:
    [
        "6970e4b7a256f3df7e634104",
        "6971f3d8399f2db6cf3caf48"
    ]

    */
    const payload = Object.keys(permissionByRole).map((roleId) => ({
      id: roleId,
      permissions: permissionByRole[roleId], // nó là lấy value của obj ["product_view", "product_create"]
    }));

    mutate(payload);
  };
  console.log(permissionByRole);
  if (isLoading) return <div>đang load</div>;
  if (isError) return <div>lỗi</div>;
  //   console.log(data);

  return (
    <div>
      <h1>Permission</h1>
      <form onSubmit={handleSubmitForm}>
        <button className="border">Câhp nhậtp</button>

        <table>
          <thead>
            <tr>
              <th>Tính năng</th>

              {data.map((item) => (
                <th key={item._id}>{item.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERMISSION_MATRIX.map((item) => (
              <Fragment key={item.prefix}>
                <tr>
                  <td className="font-bold">{item.group}</td>
                </tr>
                {item.actions.map((action) => {
                  const permissionKey = `${item.prefix}_${action}`;
                  return (
                    // mỗi hàng sẽ có permissionKey
                    <tr key={permissionKey}>
                      <td>
                        {action === "view" && "Xem"}
                        {action === "create" && "Thêm"}
                        {action === "update" && "Sửa"}
                        {action === "delete" && "Xóa"}
                        {action === "assign" && "Phân quyền"}
                      </td>
                      {data.map((role) => (
                        <td key={role._id}>
                          <input
                            onChange={() => {
                              handleOnChange(role._id, permissionKey);
                            }}
                            checked={
                              permissionByRole[role._id]?.includes(
                                permissionKey,
                              ) || false
                            }
                            type="checkbox"
                            name=""
                            id=""
                          />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default RolePermissions;
