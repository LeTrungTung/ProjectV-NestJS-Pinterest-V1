import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound";
import HomeInNotLogin from "../components/HomeInNotLogin/HomeInNotLogin";
import Register_Login_Layout from "../layouts/Register_Login_Layout/Register_Login_Layout";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import { ImageAPI } from "../api/Image";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import ProfileLayout from "../layouts/ProfileLayout/ProfileLayout";
import DetailImageLayout from "../layouts/DetailImageLayout/DetailImageLayout";
import RequiredAuth from "../components/RequireAuth";
import { useSelector } from "react-redux";

export interface IDataImage {
  categoryImage: string;
  description: string;
  id: number;
  linkImage: string;
  sourceImage: string;
  titleImage: string;
  userCreateId: number;
}

const Router: React.FC = () => {
  const [imageList, setImageList] = useState<Array<IDataImage>>([]);
  const [isCallImage, setIsCallImage] = useState(true);

  // gọi lại state thay đổi tên username
  const dataUpdate = useSelector((state: any) => state.editName);

  // gọi dữ liệu API images lấy toàn bộ ảnh
  useEffect(() => {
    const fetchDataImage = async () => {
      try {
        const response = await ImageAPI.getAllImages();
        setImageList(response.data);
      } catch (error) {
        console.error("Error retrieving data: ", error);
      }
    };
    if (isCallImage) {
      fetchDataImage();
    }
    return () => {
      setIsCallImage(false);
    };
  }, [isCallImage, dataUpdate]);

  console.log("imageList API====>", imageList);

  return (
    <Routes>
      <Route element={<RequiredAuth />}>
        <Route
          path="/home"
          element={<DefaultLayout dataImage={imageList} />}
        />
        <Route path="/detail/:id" element={<DetailImageLayout />} />

        <Route path="/profile/:idUser" element={<ProfileLayout />} />
      </Route>

      <Route path="/" index element={<HomeInNotLogin />} />

      <Route
        path="/login"
        element={<Register_Login_Layout children={<Login />} />}
      />
      <Route
        path="/register"
        element={<Register_Login_Layout children={<Register />} />}
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
