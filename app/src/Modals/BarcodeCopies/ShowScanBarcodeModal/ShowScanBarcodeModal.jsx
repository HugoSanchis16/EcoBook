import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import useNotification from "../../../Hooks/useNotification";
import useRequest from "../../../Hooks/useRequest";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";

const ShowScanBarcodeModal = ({
  show,
  onClose,
  isScanningEnabled,
  setIsScanningEnabled,
}) => {
  useEffect(() => {
    if (show) {
      setIsScanningEnabled(true);
    }
  }, [show]);

  const handleBarcodeScan = (err, result) => {
    if (result?.text) {
      setIsScanningEnabled(false);
      onClose(result.text);
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        onClose(false);
      }}
    >
      <Modal.Body className="align-items-center">
        <div>
          <h5 className="secondary text-center ">Scanning Barcode...</h5>
        </div>
        <div className="d-flex justify-content-center mt-3  ">
          {isScanningEnabled && (
            <BarcodeScannerComponent
              width={500}
              height={250}
              onUpdate={handleBarcodeScan}
            />
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={() => onClose(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowScanBarcodeModal;