import { Button } from "react-bootstrap";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import BarcodeComponent from "../../Unassign/UnassignCopyModal.jsx/Components/BarcodeComponent";

const ShowBarcodeModal = ({ show, onClose, data }) => {
  const hideModal = () => {
    onClose();
  };

  return (
    <ModalLayout
      show={show}
      onHide={hideModal}
      size="lm"
      footer={
        <div className="d-flex justify-content-end gap-2">
          <Button variant="danger" size="lm" onClick={hideModal}>
            Close
          </Button>
        </div>
      }
    >
      <div className="mb-1">
        <BarcodeComponent code={data} />
      </div>
    </ModalLayout>
  );
};

export default ShowBarcodeModal;
