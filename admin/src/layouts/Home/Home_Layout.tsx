import React, { ReactNode, useState } from "react";
import MainBar from "../../components/mainBar/MainBar";
import SideBar from "../../components/sideBar/SideBar";
import "./Home_Layout.css";

// interface HomeProps {
//   children?: ReactNode;
// }
const Home_Layout: React.FC = () => {
  const [searchAdmin, setSearchAdmin] = useState<string>(""); // Đặt kiểu dữ liệu cho useState
  const [checkSortName, setCheckSortName] = useState<boolean>(false);
  const [checkSortAdmin, setCheckSortAdmin] =
    useState<boolean>(false);
  const [checkSortFollowed, setCheckSortFollowed] =
    useState<boolean>(false);
  const [checkSortFollowOther, setCheckSortFollowOther] =
    useState<boolean>(false);

  const handleSearchAdmin = (keyword: string) => {
    setSearchAdmin(keyword);
  };
  const handleSortName = (check: boolean): void => {
    setCheckSortName(check);
  };
  const handleSortFollowed = (check: boolean): void => {
    setCheckSortFollowed(check);
  };
  const handleSortFollowOther = (check: boolean): void => {
    setCheckSortFollowOther(check);
  };
  const handleSortAdmin = (check: boolean): void => {
    setCheckSortAdmin(check);
  };
  return (
    <div>
      <div className="mainbar">
        <SideBar
          onSearchAdmin={handleSearchAdmin}
          onCheckSortName={handleSortName}
          onCheckSortFollowed={handleSortFollowed}
          onCheckSortFollowOther={handleSortFollowOther}
          onCheckSortAdmin={handleSortAdmin}
        />
      </div>
      <MainBar
        searchByAdmin={searchAdmin}
        checkSortByName={checkSortName}
        checkSortByFollowed={checkSortFollowed}
        checkSortByFollowOther={checkSortFollowOther}
        checkSortByAdmin={checkSortAdmin}
      />
    </div>
  );
};

export default Home_Layout;
