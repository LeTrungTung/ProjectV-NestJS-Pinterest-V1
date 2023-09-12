import React, { useEffect, useRef, useState } from "react";
import "./Profile.css";
import { ImageAPI } from "../../api/Image";
import { FollowAPI } from "../../api/Follow";
import { UserAPI } from "../../api/User";
import { IDataUserById } from "../../types/type";

interface ProfileProps {
  idUser: number;
}

const Profile: React.FC<ProfileProps> = (props) => {
  const { idUser } = props;

  const [usersCreateImage, setUsersCreateImage] = useState<
    Array<any>
  >([]);
  const [usersSaveImage, setUsersSaveImage] = useState<Array<any>>(
    []
  );
  const [userFollowed, setUserFollowed] = useState<any>([]);
  const [userFollowOther, setUserFollowOther] = useState<any>([]);
  const [listUser, setListUser] = useState<IDataUserById>();
  const [users, setUsers] = useState<Array<IDataUserById>>([]);

  const userLogin =
    JSON.parse(localStorage.getItem("userLogin")) || [];

  const [showRenderUserFollowed, setShowRenderUserFollowed] =
    useState(false);
  const [showRenderUserFollowOther, setShowRenderUserFollowOther] =
    useState(false);
  const renderUserFollowedRef = useRef<any>(null);
  const renderUserFollowOtherRef = useRef<any>(null);

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const response = await UserAPI.getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Error get User:", error);
      }
    };
    fetchDataUser();
  }, []);

  useEffect(() => {
    const fetchDataUserById = async (id: number) => {
      try {
        const response = await UserAPI.getUserById(id);
        setListUser(response.data);
      } catch (error) {
        console.error("Error get User:", error);
      }
    };
    if (idUser) {
      fetchDataUserById(idUser);
    }
  }, [idUser]);

  useEffect(() => {
    const fetchUserJoinImage = async (id: number) => {
      try {
        const response1 = await ImageAPI.getUsersCreateImage(id);
        const response2 = await ImageAPI.getUsersSaveImage(id);
        setUsersCreateImage(response1.data);
        setUsersSaveImage(response2.data);
      } catch (error) {
        console.error("Error retrieving data: ", error);
      }
    };
    if (idUser) {
      fetchUserJoinImage(idUser);
    }
  }, [idUser]);

  useEffect(() => {
    const fetchUserFollowed = async (id: number) => {
      try {
        const response = await FollowAPI.getUserFollowed(id);
        const response1 = await FollowAPI.getUserFolloweOther(id);
        setUserFollowed(response.data);
        setUserFollowOther(response1.data);
      } catch (error) {
        console.error("Error retrieving data: ", error);
      }
    };
    if (idUser) {
      fetchUserFollowed(idUser);
    }
  }, [idUser]);

  const usersFollowOther = users?.filter((user) => {
    const findUser = userFollowed[0]?.userFollowedbys.find(
      (person: any) => person?.userFollowOtherId === user.id
    );
    // Chỉ trả về true nếu findUser không bằng undefined
    return findUser !== undefined;
  });

  const usersFollowed = users?.filter((user) => {
    const findUser = userFollowOther[0]?.userFollowOthers.find(
      (person: any) => person?.userFollowedbyId === user.id
    );
    // Chỉ trả về true nếu findUser không bằng undefined
    return findUser !== undefined;
  });

  const [isCreatedActive, setIsCreatedActive] = useState(false);

  const handleChoice = (value: string) => {
    if (value === "Tạo") {
      setIsCreatedActive(true);
    }
    if (value === "Lưu") {
      setIsCreatedActive(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        renderUserFollowedRef.current &&
        !renderUserFollowedRef.current.contains(event.target)
      ) {
        setShowRenderUserFollowed(false);
      }
      if (
        renderUserFollowOtherRef.current &&
        !renderUserFollowOtherRef.current.contains(event.target)
      ) {
        setShowRenderUserFollowOther(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleViewDetailFollowed = () => {
    setShowRenderUserFollowed(true);
  };
  const handleViewDetailFollowOther = () => {
    setShowRenderUserFollowOther(true);
  };

  return (
    <div>
      {listUser?.avatar == null ? (
        <img
          src="https://cdn.onlinewebfonts.com/svg/img_542942.png"
          alt="avatar"
          id="avatar-document"
        />
      ) : (
        <img
          src={listUser.avatar}
          alt="avatar"
          className="cl-hover"
          id="avatar-document"
        />
      )}
      <h1 className="username-document">{listUser?.username}</h1>
      <p className="email-document">{listUser?.email}</p>
      <p className="counts-follow">
        <span>{userFollowed[0]?.userFollowedbys?.length}</span>
        <span
          className="cl-userfollow"
          onClick={handleViewDetailFollowed}
        >
          Người theo dõi
        </span>
        <span>|</span>
        <span> {userFollowOther[0]?.userFollowOthers?.length}</span>
        <span
          className="cl-userfollow"
          onClick={handleViewDetailFollowOther}
        >
          Người đang theo dõi
        </span>
      </p>
      {showRenderUserFollowed && (
        <div className="overlay">
          <div
            ref={renderUserFollowedRef}
            className="render-user-followed"
          >
            <h2>{usersFollowOther.length} Người theo dõi</h2>
            <div className="row-render-userfollowed">
              {usersFollowOther.map((user: any) => {
                return (
                  <div key={user.id} className="wrap-row1">
                    <div className="avatar-name-followed">
                      <span>
                        <img src={user.avatar} alt="" />
                      </span>
                      <span className="cl-nameuser-followed">
                        {user.username}
                      </span>
                    </div>
                    <div>
                      <button id="btn-follow1" className="follow">
                        Theo dõi
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {showRenderUserFollowOther && (
        <div className="overlay">
          <div
            ref={renderUserFollowOtherRef}
            className="render-user-followed"
          >
            <h2>{usersFollowed.length} Người đang theo dõi</h2>
            <div className="row-render-userfollowed">
              {usersFollowed?.map((user) => {
                return (
                  <div key={user.id} className="wrap-row1">
                    <div className="avatar-name-followed">
                      <span>
                        <img src={user.avatar} alt="" />
                      </span>
                      <span className="cl-nameuser-followed">
                        {user.username}
                      </span>
                    </div>
                    <div>
                      <button id="btn-follow1" className="follow">
                        Theo dõi
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <p className="choice-create">
        <span
          className={`create-document ${
            isCreatedActive ? "active1" : ""
          }`}
          onClick={() => handleChoice("Tạo")}
        >
          Đã tạo
        </span>
        <span
          className={`save-document ${
            !isCreatedActive ? "active1" : ""
          }`}
          onClick={() => handleChoice("Lưu")}
        >
          Đã lưu
        </span>
      </p>
      {/* render ảnh đã tạo */}
      {isCreatedActive && (
        <div className="render-img-create">
          {usersCreateImage?.map((item) => (
            <div key={item.id} className="img-post">
              <img
                src={item.linkImage}
                alt="imagecreate"
                className="img-created"
              />
            </div>
          ))}
        </div>
      )}
      {/* render ảnh đã lưu */}
      {!isCreatedActive && (
        <div className="render-img-save">
          {usersSaveImage?.map((item) => (
            <div key={item.idSaveImage} className="img-saved">
              <img
                src={item.imageSaved.linkImage}
                alt="imagesaved"
                className="img-created"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
