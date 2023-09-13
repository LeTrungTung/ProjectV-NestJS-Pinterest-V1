import React, { useState } from "react";
import SideBar from "../../components/sideBar/SideBar";
import ImageManage from "../../components/manaImage/ImageManage";
import CRUDImage from "../../components/crudImage/CRUDImage";

const Image_Layout: React.FC = () => {
  const [searchAdmin, setSearchAdmin] = useState<string>(""); // Đặt kiểu dữ liệu cho useState
  const handleSearchAdmin = (keyword: string) => {
    setSearchAdmin(keyword);
  };
  return (
    <div>
      <div className="mainbar">
        <SideBar onSearchAdmin={handleSearchAdmin} />
      </div>
      {/* <ImageManage searchByAdmin={searchAdmin} /> */}
      <CRUDImage />
    </div>
  );
};

export default Image_Layout;
