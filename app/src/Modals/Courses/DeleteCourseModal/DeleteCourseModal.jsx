import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Endpoints, getEndpoint } from "../../../Constants/endpoints.contants";
import useNotification from "../../../Hooks/useNotification";
import useRequest from "../../../Hooks/useRequest";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";

const DeleteCourseModal = ({ show, onClose, data }) => {
  const request = useRequest();

  const { showNotification: errorNotification } = useNotification();
  const { showNotification: successNotification } = useNotification("success");

  const handleSubmit = () => {
    console.log({ data });
    request("post", getEndpoint(Endpoints.Courses.deleteCourse.delete), {
      guid: data,
    })
      .then((res) => {
        successNotification("Course deleted successfully!");
        onClose(true);
      })
      .catch((err) => errorNotification(err.message));
  };

  const hideModal = () => {
    onClose();
  };

  const fontSize = {
    fontSize: "16px",
  };

  return (
    <ModalLayout
      show={show}
      onHide={hideModal}
      size="lm"
      header={true}
      customHeader={
        <div className="d-flex align-items-center justify-content-between w-100">
          <Modal.Title className="ms-2">Comfirm de Action</Modal.Title>
        </div>
      }
      footer={
        <div className="d-flex justify-content-end gap-2">
          <Button variant="light" size="lm" onClick={hideModal}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="danger" size="lm">
            Confirm
          </Button>
        </div>
      }
    >
      <div className="mb-1">
        <p style={fontSize}>Are your sure that you want to remove the course?</p>
      </div>
    </ModalLayout>
  );
};


export default DeleteCourseModal;
