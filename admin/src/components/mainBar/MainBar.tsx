import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "./MainBar.css";
import { UserAPIAdmin } from "../../api/User";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";

interface User {
  id: number;
  username: string;
  avatar?: string;
  email: string;
  status: number;
  role: number;
}

interface CountFollow {
  numberOfFollowers: number;
  numberOfFollowOthers: number;
}
interface MainProps {
  searchByAdmin: string;
}

const MainBar: React.FC<MainProps> = (props) => {
  const { searchByAdmin } = props;
  console.log("searchByAdmin====>", searchByAdmin);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState<User[]>([]);
  const [count1Followed, setCount1Followed] = useState<CountFollow[]>(
    []
  );
  const [countFollowedOther, setCountFollowedOther] = useState<
    CountFollow[]
  >([]);
  const [isActive, setIsActive] = useState(true);

  // đếm số followed của user
  const fetchCountFollowUser = async () => {
    try {
      const response = await UserAPIAdmin.countFollowed();
      setCount1Followed(response.data);
      console.log("countFollowed", response.data);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };
  useEffect(() => {
    fetchCountFollowUser();
  }, []);

  // đếm số lượng user follow người khác
  const fetchCountFollowOther = async () => {
    try {
      const response = await UserAPIAdmin.countFollowOther();
      setCountFollowedOther(response.data);
      console.log("countFollowOther", response.data);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };
  useEffect(() => {
    fetchCountFollowOther();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await UserAPIAdmin.getUsers();
      setUserData(response.data);
      console.log("getUsers", response.data);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);

  const dataSearchAdmin = userData.filter(
    (item) =>
      item?.username
        .toLowerCase()
        .includes(searchByAdmin.toLowerCase().trim()) ||
      item?.email
        .toLowerCase()
        .includes(searchByAdmin.toLowerCase().trim())
  );
  console.log("dataSearchAdmin", dataSearchAdmin);

  const usersPerPage = 6;
  const totalPages = Math.ceil(dataSearchAdmin.length / usersPerPage);
  // Xử lý khi người dùng chọn trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  // Tính toán chỉ mục dòng đầu và dòng cuối của trang hiện tại
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentData = dataSearchAdmin.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const handleIsActive = async (id: number) => {
    setIsActive(!isActive);

    let newStatus;
    const updatedUserData = userData?.map((user) => {
      if (user.id === id) {
        if (user.status === 1) {
          newStatus = 0;
        } else {
          newStatus = 1;
        }

        // const newStatus = !user.status;
        return {
          ...user,
          status: newStatus,
        };

        // fetchEditStatus(id, newStatus);
      }
      return user;
    });
    setUserData(updatedUserData);

    // Đổi status trên Database
    const editStatus = {
      status: newStatus,
    };
    // const id = userLogin?.idUser;
    // console.log("idusserlogin", id);
    try {
      await UserAPIAdmin.editStatus(id, editStatus);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
    fetchAllUsers();
  };

  return (
    <div className="main-bar">
      <p id="title-user-mana">Quản lý danh sách người dùng</p>
      <div style={{ overflowX: "auto", width: 1030 }}>
        <Table striped bordered hover size="sm" className="tb-show">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên người dùng</th>
              <th>Avatar</th>
              <th>Địa chỉ Email</th>
              <th>Theo dõi</th>
              <th>Đang theo dõi</th>
              <th>Trạng thái</th>
              <th>Admin/User</th>
            </tr>
          </thead>
          <tbody>
            {currentData &&
              currentData?.map((user, index) => (
                <tr
                  key={user.id}
                  className={user.role === 1 ? "active-admin" : ""}
                >
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>
                    {user?.avatar == null ? (
                      <img
                        src="https://cdn.onlinewebfonts.com/svg/img_542942.png"
                        alt="avatar"
                      />
                    ) : (
                      <img src={user?.avatar} alt="avatar" />
                    )}

                    {/* <img src={user.avatarUser} alt="Avatar" /> */}
                  </td>
                  <td>{user.email}</td>
                  <td>{count1Followed[index]?.numberOfFollowers}</td>
                  <td>
                    {countFollowedOther[index]?.numberOfFollowOthers}
                  </td>
                  <td>
                    {user?.role === 2 && (
                      <Button
                        variant={
                          user.status == 0 ? "info" : "warning"
                        }
                        onClick={() => handleIsActive(user.id)}
                      >
                        {user.status == 1 ? "Active" : "InActive"}
                        {/* {isActive ? "Active" : "Not Active"} */}
                      </Button>
                    )}
                  </td>
                  <td>{user.role === 1 ? "IsAdmin" : "IsUser"}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>

      {/* Phân trang */}
      <div className="pagination">
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          variant="light"
          className="pre-pagination"
        >
          <AiOutlineArrowLeft />
        </Button>
        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        ).map((page) => (
          <Button
            key={page}
            variant={
              currentPage === page ? "primary" : "outline-primary"
            }
            onClick={() => handlePageChange(page)}
            className="btn-pagination"
          >
            {page}
          </Button>
        ))}
        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          variant="light"
          className="pre-pagination"
        >
          <AiOutlineArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default MainBar;
