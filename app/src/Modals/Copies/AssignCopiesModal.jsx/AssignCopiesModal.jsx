import { Button, Form, Modal } from "react-bootstrap";
import { Endpoints, getEndpoint } from "../../../Constants/endpoints.contants";
import useNotification from "../../../Hooks/useNotification";
import useRequest from "../../../Hooks/useRequest";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import { StringsContext } from "../../../Context/strings.context";
import { useContext, useEffect, useState } from "react";
import IconButton from "../../../Components/Buttons/IconButton";
import { BsFillWebcamFill } from "react-icons/bs";
import { MdBarcodeReader } from "react-icons/md";
import ShowScanBarcodeModal from "../../BarcodeCopies/ShowScanBarcodeModal/ShowScanBarcodeModal";
import useModalManager from "../../../Hooks/useModalManager";

const AssignCopiesModal = ({ show, onClose, data }) => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.Copies.deleteCopies;
  const request = useRequest();

  const [isScanningEnabled, setIsScanningEnabled] = useState(false);
  const [scanning, setScanning] = useState(false);

  const { showNotification: errorNotification } = useNotification();
  const { showNotification: successNotification } = useNotification("success");

  const [uniqid, setUniqid] = useState("");

  useEffect(() => {
    if (show) {
      setUniqid("");
    }
    if (uniqid !== "") {
      handleSubmit();
    }
  }, [show, uniqid]);

  const {
    closeModal: closeScanModal,
    openModal: openScanModal,
    show: showScanModal,
  } = useModalManager();

  const handleSubmit = () => {
    request("post", getEndpoint(Endpoints.assign.check.checkAssign), {
      uniqid,
      subject: data.value,
    })
      .then((res) => {
        successNotification(ViewStrings.message);
        onClose({ uniqid, value: data.value });
      })
      .catch((err) => {
        errorNotification(err.message);
        onClose(true);
      });
  };

  const hideModal = () => {
    onClose(true);
  };

  const handleText = (e) => {
    const { value } = e.target;
    setUniqid(value);
  };

  const handleCheck = () => {
    if (scanning) {
      document.getElementById("uniqid").blur();
    } else {
      document.getElementById("uniqid").focus();
    }
    setScanning((prevValue) => !prevValue);
  };

  const handleOpenScanModal = ({ isScanningEnabled }) => {
    openScanModal({ setIsScanningEnabled, isScanningEnabled });
  };

  const handleCloseScanModal = (uniqid) => {
    closeScanModal();
    setIsScanningEnabled(false);
    if (uniqid) {
      console.log(uniqid);
      setUniqid(uniqid);
    }
  };

  const fontSize = {
    fontSize: "16px",
  };

  return (
    <>
      <ShowScanBarcodeModal
        show={showScanModal}
        onClose={handleCloseScanModal}
        isScanningEnabled={isScanningEnabled}
        setIsScanningEnabled={setIsScanningEnabled}
      />

      <ModalLayout
        show={show}
        onHide={hideModal}
        size="lg"
        header={true}
        customHeader={
          <div className="d-flex align-items-center justify-content-between w-100">
            <Modal.Title className="ms-2">
              Asignar Libro de {data.label}
            </Modal.Title>
            <div className="d-flex align-items-center justify-content-between">
              <IconButton
                title={scanning ? "scanning" : "scan"}
                Icon={MdBarcodeReader}
                onClick={handleCheck}
              ></IconButton>
              <IconButton
                Icon={BsFillWebcamFill}
                title={isScanningEnabled ? "scanning" : "scan"}
                onClick={handleOpenScanModal}
              />
            </div>
          </div>
        }
        footer={
          <div className="d-flex justify-content-end gap-2">
            <Button variant="light" size="lm" onClick={hideModal}>
              {ViewStrings.cancel}
            </Button>
            <Button
              variant="danger"
              size="lm"
              disabled={!uniqid}
              onClick={handleSubmit}
            >
              {ViewStrings.confirm}
            </Button>
          </div>
        }
      >
        <Form.Group className="mb-3">
          <Form.Label>Codigo del libro</Form.Label>
          <Form.Control
            id="uniqid"
            required
            onChange={handleText}
            type="text"
            maxLength={13}
            value={uniqid}
            placeholder="442325658556"
          />
        </Form.Group>
      </ModalLayout>
    </>
  );
};

export default AssignCopiesModal;
