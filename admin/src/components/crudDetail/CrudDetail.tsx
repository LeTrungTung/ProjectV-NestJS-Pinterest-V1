import React, { useEffect, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";
import "./CrudDetail.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImageAPIAdmin } from "../../api/Image";

interface ImageChoice {
  userCreateId?: string | undefined;
  categoryImage?: string | undefined;
  titleImage?: string | undefined;
  sourceImage?: string | undefined;
  description?: string | undefined;
  linkImage?: string | undefined;
}

// interface FormEdit extends ImageChoice {}

const CrudDetail: React.FC = () => {
  const navigate = useNavigate();
  const paramsId = useParams();
  const numberId = Number(paramsId.id);

  const [imageChoice, setImageChoice] = useState<ImageChoice>();
  const [isEditActive, setIsEditActive] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Trạng thái hiển thị modal xóa

  // gọi dữ liệu API lấy image by Id
  const fetchImageById = async (id: number) => {
    try {
      const response = await ImageAPIAdmin.getImageById(id);
      setImageChoice(response.data);
      console.log("getImageById", response.data);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };
  useEffect(() => {
    fetchImageById(numberId);
  }, []);

  console.log("ImageChoice", imageChoice);
  console.log("ImageChoice[0]", imageChoice?.linkImage);
  const adminLogin =
    JSON.parse(localStorage.getItem("adminLogin")) || [];

  const [formEdit, setFormEdit] = useState<ImageChoice>();
  //   {
  //   userCreateId: "",
  //   categoryImage: "",
  //   titleImage: "",
  //   sourceImage: "",
  //   description: "",
  // }

  const handleEditImage = () => {
    setFormEdit({
      userCreateId: imageChoice?.userCreateId,
      categoryImage: imageChoice?.categoryImage,
      titleImage: imageChoice?.titleImage,
      sourceImage: imageChoice?.sourceImage,
      description: imageChoice?.description,
    });
    setIsEditActive(true);
  };

  const handleFormChange = (e: any) => {
    setFormEdit({
      ...formEdit,
      [e.target.name]: e.target.value,
    });
  };

  const EditImagebyId = async (id: number, param: any) => {
    try {
      await ImageAPIAdmin.editImagebyId(id, param);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle saving changes logic here
    // đè dữ liệu của object mới vào object cũ tại id tương ứng
    const updateData = { ...imageChoice, ...formEdit };

    await EditImagebyId(numberId, updateData);

    toast.success("Hiệu chỉnh hoàn thành!", {
      onClose: () => {
        setTimeout(() => {
          navigate("/images");
        }, 2000); // Chờ 2 giây trước khi chuyển hướng
      },
    });

    const getAllImage = async () => {};
    getAllImage();

    // Reset formEdit to empty values
    setFormEdit({
      userCreateId: "",
      categoryImage: "",
      titleImage: "",
      sourceImage: "",
      description: "",
    });
    setIsEditActive(false);
  };

  const handleDeleteImage = async () => {
    setShowDeleteModal(false);
    const getAllImage = async () => {};
    getAllImage();

    toast.success("Xóa ảnh thành công!", {
      onClose: () => {
        setTimeout(() => {
          navigate("/images");
        }, 2000); // Chờ 2 giây trước khi chuyển hướng
      },
    });
  };

  return (
    <Container id="wrap-detail">
      <div id="left-area">
        <img src={imageChoice?.linkImage} alt="" id="img-detail" />
      </div>
      <div id="right-area">
        <div id="right-area-top">
          <div id="top-right">
            <div>
              <Button variant="primary" onClick={handleEditImage}>
                Hiệu chỉnh
              </Button>
            </div>
            <div>
              <Button
                variant="danger"
                onClick={() => setShowDeleteModal(true)}
              >
                Xóa ảnh
              </Button>
            </div>
          </div>
          <div style={{ margin: "20px 50px" }}>
            <h4>Tiêu đề ảnh: {imageChoice?.titleImage}</h4>
            <p>
              <span>Nguồn gốc trang: </span>
              <u>{imageChoice?.sourceImage}</u>
            </p>
            <p>Mô tả ảnh: {imageChoice?.description}</p>
          </div>
          {/* <br /> */}
          <div id="forrm-edit">
            <h5 style={{ textAlign: "center" }}>
              Form hiệu chỉnh hình ảnh
            </h5>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Tiêu đề ảnh</Form.Label>
                <Form.Control
                  type="text"
                  name="titleImage"
                  placeholder="Tiêu đề ảnh"
                  value={formEdit?.titleImage}
                  onChange={handleFormChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Nguồn gốc trang</Form.Label>
                <Form.Control
                  type="text"
                  name="sourceImage"
                  placeholder="Nguồn gốc trang"
                  value={formEdit?.sourceImage}
                  onChange={handleFormChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Mô tả ảnh</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="description"
                  value={formEdit?.description}
                  onChange={handleFormChange}
                />
              </Form.Group>
              {isEditActive == true ? (
                <Button
                  style={{ textAlign: "center" }}
                  onClick={handleSaveChanges}
                >
                  Lưu thay đổi
                </Button>
              ) : (
                ""
              )}
            </Form>
          </div>
        </div>

        <Modal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận xóa ảnh</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn có chắc chắn muốn xóa ảnh này?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Hủy
            </Button>
            <Button variant="danger" onClick={handleDeleteImage}>
              Xóa
            </Button>
          </Modal.Footer>
        </Modal>
        <ToastContainer />
      </div>
    </Container>
  );
};

export default CrudDetail;
