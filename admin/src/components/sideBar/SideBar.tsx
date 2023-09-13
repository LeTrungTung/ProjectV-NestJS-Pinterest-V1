import React, { useState } from "react";
import "./SideBar.css";
import { BiLogOut, BiSolidUserAccount } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { BsSearch, BsChevronDown } from "react-icons/bs";
import { FaRegImages } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

interface AdminLogin {
  avatar?: string;
  username?: string;
  email?: string;
}
interface SideBarProps {
  onSearchAdmin?: (keyword: string) => void;
  onCheckSortName?: (check: boolean) => void;
  onCheckSortFollowed?: (check: boolean) => void;
  onCheckSortFollowOther?: (check: boolean) => void;
  onCheckSortAdmin?: (check: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = ({
  onSearchAdmin,
  onCheckSortName,
  onCheckSortFollowed,
  onCheckSortFollowOther,
  onCheckSortAdmin,
}) => {
  const [searchValue, setSearchValue] = useState(""); // State để lưu giá trị input
  const adminLogin: AdminLogin = JSON.parse(
    localStorage.getItem("adminLogin") || "{}"
  );
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("adminLogin");
    window.location.href = "/";
  };
  const handleSearchAdmin = () => {
    onSearchAdmin(searchValue);
  };
  const handleSortName = () => {
    onCheckSortName(true);
    onCheckSortFollowOther(false);
    onCheckSortFollowed(false);
    onCheckSortAdmin(false);
  };
  const handleSortFollowed = () => {
    onCheckSortFollowed(true);
    onCheckSortName(false);
    onCheckSortFollowOther(false);
    onCheckSortAdmin(false);
  };
  const handleSortFollowOther = () => {
    onCheckSortFollowOther(true);
    onCheckSortFollowed(false);
    onCheckSortName(false);
    onCheckSortAdmin(false);
  };
  const handleSortAdmin = () => {
    onCheckSortAdmin(true);
    onCheckSortFollowOther(false);
    onCheckSortFollowed(false);
    onCheckSortName(false);
  };

  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="container1">
      <div className="top-part">
        <div>
          <img
            src="https://thumbs.dreamstime.com/b/colored-pinterest-logo-icon-high-resolution-colored-pinterest-logo-white-background-vector-eps-file-available-additional-175720335.jpg?w=768"
            alt="logo"
            id="logo"
          />
          <span id="name-logo">Picture for Life</span>
        </div>
        <div id="wrap-logout">
          <BiLogOut id="logout" onClick={handleLogout} />
        </div>
      </div>
      <div className="avatar-part">
        <div className="avatar-part-left">
          <div>
            <img
              src={adminLogin?.avatar}
              alt="avatar"
              id="avatar-admin"
            />
          </div>
          <div className="name-email">
            <span id="name-admin">{adminLogin?.username}</span>
            <span id="email-admin">{adminLogin?.email}</span>
          </div>
        </div>
        <div id="setting">
          <FiSettings />
        </div>
      </div>
      <div className="search-admin">
        <input
          type="search"
          placeholder="Search"
          id="ip-search"
          value={searchValue} // Giá trị input được lấy từ state
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <BsSearch id="glass" onClick={handleSearchAdmin} />
      </div>
      <div className="content-side">
        <p id="txt-admin">ADMIN</p>
      </div>
      <div
        className={
          location.pathname == "/home"
            ? "manage-user activeadmin"
            : "manage-user"
        }
      >
        <div
          className="manage-user-left"
          onClick={() => {
            navigate(`/home`);
          }}
        >
          <BiSolidUserAccount id="icon-user" />
          <span className="name-user">User Management</span>
        </div>
        <div>
          <BsChevronDown id="arr-down-user" />
        </div>
      </div>
      <div className="detail-user">
        <div className="detail-user-left">
          <span className="dash">-</span>
          <span className="txt">Users</span>
        </div>
        <div>
          <BsChevronDown className="arr-down-mini" />
        </div>
      </div>

      <div className="sort-act hover1">
        <span className="dot">o</span>
        <span
          className="txt1"
          onClick={() => {
            handleSortName();
          }}
        >
          Sort by username
        </span>
      </div>
      <div className="sort-act hover1">
        <span className="dot">o</span>
        <span
          className="txt1"
          onClick={() => {
            handleSortFollowed();
          }}
        >
          Sort by followed
        </span>
      </div>
      <div className="sort-act hover1">
        <span className="dot">o</span>
        <span
          className="txt1"
          onClick={() => {
            handleSortFollowOther();
          }}
        >
          Sort by follow others
        </span>
      </div>

      <div className="detail-user">
        <div detail-user-left>
          <span className="dash">-</span>
          <span className="txt">Admins</span>
        </div>
        <div>
          <BsChevronDown className="arr-down-mini" />
        </div>
      </div>
      <div className="sort-act hover1">
        <span className="dot">o</span>
        <span
          className="txt1"
          onClick={() => {
            handleSortAdmin();
          }}
        >
          Sort by admin name
        </span>
      </div>

      <div
        className={
          location.pathname == "/image"
            ? "manage-product activeadmin"
            : "manage-product"
        }
      >
        <div
          className="manage-user-left"
          onClick={() => {
            navigate(`/image`);
          }}
        >
          <FaRegImages id="icon-user" />
          <span className="name-user">Product Management</span>
        </div>
        <div>
          <BsChevronDown id="arr-down" />
        </div>
      </div>
      <div className="detail-user">
        <div className="detail-user-left">
          <span className="dash">-</span>
          <span className="txt">Images</span>
        </div>
        <div>
          <BsChevronDown className="arr-down-mini" />
        </div>
      </div>

      <div className="sort-act hover1">
        <span className="dot">o</span>
        <span className="txt1">Sort by image category</span>
      </div>
      <div className="sort-act hover1">
        <span className="dot">o</span>
        <span className="txt1">Sort image created</span>
      </div>
    </div>
  );
};

export default SideBar;
