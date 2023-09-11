import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { UserAPI } from "../../api/User";
import { useDispatch } from "react-redux";
import { updateName } from "../../store/editNameSlice";
import "./ModalFormRename.css";

interface ModalFormChangeAvatarProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const ModalFormChangeAvatar: React.FC<ModalFormChangeAvatarProps> = (
  props
) => {
  const userLogin =
    JSON.parse(localStorage.getItem("userLogin")) || [];
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const dispatch = useDispatch();

  const handleClose = () => props.setShow(false);
  const handleFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Vui lòng chọn một tệp ảnh để tải lên");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    const id = userLogin?.id;
    try {
      await UserAPI.editAvatar(id, formData);
      dispatch(updateName());
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
    props.setShow(false);
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
          <Modal.Title id="modal-title">Đổi ảnh đại diện</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit} id="id-form">
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                type="file"
                placeholder="Chọn file ảnh thay đổi"
                autoFocus
                name="linkImage"
                onChange={handleImageChange}
              />
            </Form.Group>
            <div className="ctr-form1">
              <Button variant="primary" type="submit">
                Lưu Avatar mới
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

export default ModalFormChangeAvatar;
