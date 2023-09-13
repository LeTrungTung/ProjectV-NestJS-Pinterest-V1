import React, { ReactNode, useState } from "react";
import MainBar from "../../components/mainBar/MainBar";
import SideBar from "../../components/sideBar/SideBar";
import "./Home_Layout.css";

// interface HomeProps {
//   children?: ReactNode;
// }
const Home_Layout: React.FC = () => {
  const [searchAdmin, setSearchAdmin] = useState<string>(""); // Đặt kiểu dữ liệu cho useState
  const handleSearchAdmin = (keyword: string) => {
    setSearchAdmin(keyword);
  };
  return (
    <div>
      <div className="mainbar">
        <SideBar onSearchAdmin={handleSearchAdmin} />
      </div>
      <MainBar searchByAdmin={searchAdmin} />
    </div>
  );
};

export default Home_Layout;
