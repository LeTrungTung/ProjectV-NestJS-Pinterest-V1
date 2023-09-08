import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import "./Admin.css";
import UserManage from "../../components/manageUser/UserManage";
import { Link, useLocation } from "react-router-dom";

interface AdminLogin {
  avatar?: string;
  username?: string;
  email?: string;
}

const Admin: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const adminLogin: AdminLogin = JSON.parse(
    localStorage.getItem("adminLogin") || "{}"
  );
  const handleArrowClick = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const handleRenameUser = () => {};
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("adminLogin");
    window.location.href = "/";
  };
  return (
    <div id="wrap-admin">
      <div id="header-admin">
        <div id="header-admin-left">
          <img src="https://seeklogo.com/images/P/pinterest-logo-B783288EDA-seeklogo.com.png" />
        </div>
        <div id="sec-center">
          <ul>
            <Link to="/admin">
              <li
                className={
                  location.pathname == "/admin" ? "active" : ""
                }
              >
                Quản lý người dùng
              </li>
            </Link>
            <Link to="/images">
              <li>Quản lý hình ảnh</li>
            </Link>
          </ul>
        </div>
        <div id="header-admin-left">
          <div id="sec-right">
            <img src={adminLogin?.avatar} />
            <div className="wrap-avata-hover1">
              <IoIosArrowDown
                id="icon-admin"
                onClick={handleArrowClick}
                className={isMenuOpen ? "open" : ""}
              />
              <div className="view-hover-avatar">
                <span>Chi tiết tài khoản</span>
              </div>
              {isMenuOpen && (
                <div className="menu-dropdown" ref={menuRef}>
                  <span className="profile-logout1">
                    Đang đăng nhập
                  </span>
                  <div className="row-avataemail-name1 hoverto">
                    <img
                      src={adminLogin?.avatar}
                      alt="avata"
                      className="avata-of"
                    />
                    <div className="email-name1">
                      <span>{adminLogin?.username}</span>
                      <span>{adminLogin?.email}</span>
                    </div>
                  </div>
                  <span
                    className="profile-logout hoverto"
                    onClick={handleRenameUser}
                  >
                    Đổi tên tài khoản
                  </span>

                  <span
                    className="profile-logout hoverto"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="content-body">
        <UserManage />
      </div>
    </div>
  );
};

export default Admin;
