import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ImageAPI } from "../../api/Image";
import "./ModalForm.css";
import { updateName } from "../../store/editNameSlice";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

interface ModalFormProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const ModalForm: React.FC<ModalFormProps> = (props) => {
  const userLogin =
    JSON.parse(localStorage.getItem("userLogin")) || [];
  const [allImages, setAllImages] = useState<any[]>([]);
  const [dataForm, setDataForm] = useState({
    userCreateId: userLogin?.id,
    titleImage: "",
    description: "",
    sourceImage: "",
    categoryImage: "",
    linkImage: null,
  });
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const dispatch = useDispatch();

  // gọi dữ liệu bảng images
  // const fetchAllImages = async () => {
  //   try {
  //     const response = await ImageAPI.getAllImages();
  //     setAllImages(response.data);
  //   } catch (error) {
  //     console.error("Error retrieving data: ", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchAllImages();
  // }, []);

  const handleClose = () => props.setShow(false);
  const handleFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const dataFromPost = dataForm;
    if (!selectedFile) {
      alert("Vui lòng chọn một tệp ảnh để tải lên");
      return;
    }
    const formData = new FormData();
    formData.append("linkImage", selectedFile);
    formData.append("userCreateId", userLogin?.id);
    formData.append("categoryImage", dataFromPost.categoryImage);
    formData.append("titleImage", dataFromPost.titleImage);
    formData.append("description", dataFromPost.description);
    formData.append("sourceImage", dataFromPost.sourceImage);

    try {
      await ImageAPI.postImage(formData);
      dispatch(updateName());
      // fetchAllImages();
      props.setShow(false);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }

    // navigate(`/detail/${idNewImage}`);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setDataForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedFile(event.target.files?.[0]);
  };

  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="modal-title">
            Tạo thêm hình ảnh
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit} id="id-form">
            {/* ... (Form Group components) ... */}
            <Form.Group className="mb-3" controlId="categoryImage">
              <Form.Control
                type="text"
                placeholder="Thể loại ảnh"
                autoFocus
                name="categoryImage"
                onChange={handleInputChange}
                value={dataForm?.categoryImage}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="titleImage">
              <Form.Control
                type="text"
                placeholder="Nhập tiêu đề ảnh"
                autoFocus
                name="titleImage"
                onChange={handleInputChange}
                value={dataForm?.titleImage}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Control
                as="textarea"
                placeholder="Mô tả ảnh"
                rows={1}
                name="description"
                onChange={handleInputChange}
                value={dataForm?.description}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="sourceImage">
              <Form.Control
                type="text"
                placeholder="Nhập nguồn gốc ảnh"
                autoFocus
                name="sourceImage"
                onChange={handleInputChange}
                value={dataForm?.sourceImage}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="linkImage">
              <Form.Control
                type="file"
                placeholder="Chọn file ảnh"
                autoFocus
                name="linkImage"
                onChange={handleImageChange}
              />
            </Form.Group>

            <div className="ctr-form">
              <Button variant="primary" type="submit">
                Lưu và tạo mới
              </Button>
              <Button
                className="btn-close-modal"
                variant="secondary"
                onClick={handleClose}
              >
                Đóng
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalForm;
