import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import FormControl from "../../../Components/Form/FormControl/FormControl";
import { Endpoints, getEndpoint } from "../../../Constants/endpoints.contants";
import useNotification from "../../../Hooks/useNotification";
import useRequest from "../../../Hooks/useRequest";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";

const DeleteStudentModal = ({ show, onClose, data }) => {
  const request = useRequest();

  const { showNotification: errorNotification } = useNotification();
  const { showNotification: successNotification } = useNotification("success");

  const handleSubmit = () => {
    console.log({ data });
    request("post", getEndpoint(Endpoints.Students.deleteStudent.delete), {
      guid: data,
    })
      .then((res) => {
        successNotification("Student deleted successfully!");
        onClose(true);
      })
      .catch((err) => errorNotification(err.message));
  };

  const hideModal = () => {
    onClose();
    setData({});
  };

  return (
    <ModalLayout
      show={show}
      onHide={hideModal}
      size="sm"
      header={true}
      customHeader={
        <div className="d-flex align-items-center justify-content-between w-100">
          <Modal.Title className="ms-2">Delete Student</Modal.Title>
        </div>
      }
      footer={
        <div className="d-flex justify-content-end gap-2">
          <Button variant="light" size="sm" onClick={hideModal}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="light" size="sm">
            Delete
          </Button>
        </div>
      }
    >
      <div className="mb-3">
        <p>Are your sure that you want to remove the Student?</p>
        <b className="text-danger">This action cannot be undone</b>
      </div>
    </ModalLayout>
  );
};

export default DeleteStudentModal;
