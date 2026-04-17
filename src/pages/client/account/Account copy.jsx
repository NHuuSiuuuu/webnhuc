import { useMutation } from "@tanstack/react-query";
import axios from "../../../utils/axios";
import useAuth from "@/hooks/useAuth";

function Account() {
  const { data, isLoading } = useAuth();
  const { mutate } = useMutation({
    mutationFn: async () => {
      return await axios.get(`${import.meta.env.VITE_API_BACKEND}/logout`);
    },
  });

  if (isLoading) return <div>Loading</div>;

  return (
    <div style={{ fontFamily: "inherit" }}>
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          paddingTop: "48px",
          paddingBottom: "32px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "600",
            color: "#8B6F5E",
            margin: "0 0 24px 0",
          }}
        >
          Tài khoản của bạn
        </h1>
        <div
          style={{
            width: "48px",
            height: "2px",
            backgroundColor: "#333",
            margin: "0 auto",
          }}
        />
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid #e5e5e5" }} />

      {/* Body */}
      <div
        style={{
          display: "flex",
          gap: "64px",
          padding: "48px 80px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Sidebar */}
        <div style={{ minWidth: "200px" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "0.08em",
              color: "#5a4a42",
              marginBottom: "16px",
              textTransform: "uppercase",
            }}
          >
            Tài khoản
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {[
              { label: "Thông tin tài khoản", href: "#" },
              { label: "Danh sách địa chỉ", href: "#" },
            ].map((item) => (
              <li key={item.label} style={{ marginBottom: "10px" }}>
                <a
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px",
                    color: "#555",
                    textDecoration: "none",
                  }}
                >
                  <span style={{ fontSize: "10px", color: "#888" }}>⊙</span>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={mutate}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  color: "#555",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: "10px", color: "#888" }}>⊙</span>
                Đăng xuất
              </button>
            </li>
          </ul>
        </div>

        {/* Main content */}
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "0.08em",
              color: "#5a4a42",
              marginBottom: "16px",
              textTransform: "uppercase",
            }}
          >
            Thông tin tài khoản
          </p>

          {/* User info */}
          <div style={{ marginBottom: "24px" }}>
            <p
              style={{
                fontSize: "15px",
                fontWeight: "500",
                color: "#222",
                margin: "0 0 4px 0",
              }}
            >
              {data?.data?.fullName}
            </p>
            <p style={{ fontSize: "14px", color: "#555", margin: "0 0 4px 0" }}>
              {data?.data?.email}
            </p>
            <a
              href="#"
              style={{
                fontSize: "14px",
                color: "#8B6F5E",
                textDecoration: "none",
              }}
            >
              Xem địa chỉ
            </a>
          </div>

          {/* Empty orders box */}
          <div
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: "4px",
              padding: "20px 24px",
              backgroundColor: "#fafafa",
            }}
          >
            <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
              Bạn chưa đặt mua sản phẩm.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;