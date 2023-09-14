import React, { useState } from "react";
import SideBar from "../../components/sideBar/SideBar";
import CRUDImage from "../../components/crudImage/CRUDImage";

const Image_Layout: React.FC = () => {
  const [searchImage, setSearchImage] = useState<string>(""); // Đặt kiểu dữ liệu cho useState
  const [checkSortImage, setCheckSortImage] =
    useState<boolean>(false);
  const handleSearchImage = (keyword: string) => {
    setSearchImage(keyword);
  };
  const handleSortImage = (check: boolean): void => {
    setCheckSortImage(check);
  };
  return (
    <div>
      <div className="mainbar">
        <SideBar
          onSearchAdmin={handleSearchImage}
          onCheckSortImage={handleSortImage}
        />
      </div>
      <CRUDImage
        searchByImage={searchImage}
        checkSortByImage={checkSortImage}
      />
    </div>
  );
};

export default Image_Layout;
