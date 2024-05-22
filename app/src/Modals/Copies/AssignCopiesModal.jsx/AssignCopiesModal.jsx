import { Button, Form, Modal } from "react-bootstrap";
import { Endpoints, getEndpoint } from "../../../Constants/endpoints.contants";
import useNotification from "../../../Hooks/useNotification";
import useRequest from "../../../Hooks/useRequest";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import { StringsContext } from "../../../Context/strings.context";
import { useContext, useState } from "react";

const AssignCopiesModal = ({ show, onClose, data }) => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.Copies.deleteCopies;
  const request = useRequest();

  const { showNotification: errorNotification } = useNotification();
  const { showNotification: successNotification } = useNotification("success");

  const [uniqid, setUniqid] = useState();

  const handleSubmit = () => {
    request("post", getEndpoint(Endpoints.assign.check.checkAssign), {
      uniqid,
    })
      .then((res) => {
        successNotification(ViewStrings.message);
        onClose(true);
      })
      .catch((err) => {
        errorNotification(err.message);
        onClose(true);
      });
  };

  const hideModal = () => {
    onClose();
  };

  const handleText = (e) => {
    const { value } = e.target;
    setUniqid(value);
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
          <Modal.Title className="ms-2">
            Asignar Libro de {data.label}
          </Modal.Title>
        </div>
      }
      footer={
        <div className="d-flex justify-content-end gap-2">
          <Button variant="light" size="lm" onClick={hideModal}>
            {ViewStrings.cancel}
          </Button>
          <Button variant="danger" size="lm" onClick={handleSubmit}>
            {ViewStrings.confirm}
          </Button>
        </div>
      }
    >
      <Form.Group className="mb-3">
        <Form.Label>Codigo del libro</Form.Label>
        <Form.Control
          onChange={handleText}
          type="text"
          maxLength={13}
          placeholder="442325658556"
        />
      </Form.Group>
    </ModalLayout>
  );
};

export default AssignCopiesModal;
