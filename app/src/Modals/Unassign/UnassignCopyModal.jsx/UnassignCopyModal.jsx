import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Endpoints, getEndpoint } from "../../../Constants/endpoints.contants";
import useNotification from "../../../Hooks/useNotification";
import useRequest from "../../../Hooks/useRequest";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import BarcodeComponent from "./Components/BarcodeComponent";
import StateByFacesComponent from "./Components/StateByFacesComponent";
import Observationscomponent from "./Components/ObservationsComponent";
import { validateData } from "../../../Config/GeneralFunctions";

const UnassignCopyModal = ({ show, onClose, data }) => {
  const request = useRequest();

  const { showNotification: errorNotification } = useNotification();
  const { showNotification: successNotification } = useNotification("success");

  const [localData, setLocalData] = useState({});

  useEffect(() => {
    if (show) setLocalData(data);
  }, [data, show]);

  const handleSubmit = () => {
    if (checkData()) {
      request("post", getEndpoint(Endpoints.unassign.unassign.copies), {
        guid: data.guid,
        ...localData,
      })
        .then((res) => {
          successNotification("Book deleted successfully!");
          onClose(true);
        })
        .catch((err) => errorNotification(err.message));
    }
  };

  const hideModal = () => {
    onClose();
  };

  const checkData = () => {
    const { uniqid, state } = localData;
    return validateData([uniqid, state]);
  };

  return (
    <ModalLayout
      show={show}
      onHide={hideModal}
      size="lm"
      header={true}
      customHeader={
        <div className="d-flex align-items-center justify-content-between w-100">
          <Modal.Title className="ms-2">{localData.book_name}</Modal.Title>
        </div>
      }
      footer={
        <div className="d-flex justify-content-end gap-2">
          <Button variant="light" size="lm" onClick={hideModal}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!checkData()}
            variant="danger"
            size="lm"
          >
            Confirm
          </Button>
        </div>
      }
    >
      <div className="mb-1">
        <BarcodeComponent code={localData.uniqid} />
        <StateByFacesComponent data={localData} setData={setLocalData} />
        <Observationscomponent data={localData} setData={setLocalData} />
      </div>
    </ModalLayout>
  );
};

export default UnassignCopyModal;
