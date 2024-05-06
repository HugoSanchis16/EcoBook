import { Button, Modal } from "react-bootstrap";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import FormControl from "../../../Components/Form/FormControl/FormControl";
import { useEffect, useState } from "react";
import BarcodeLayoutToPrint from "../../../Components/BarcodeLayoutToPrint/BarcodeLayoutToPrint";
import { PDFDownloadLink } from "@react-pdf/renderer";
import useLoaded from "../../../Hooks/useLoaded";
import useRequest from "../../../Hooks/useRequest";
import { Endpoints, getEndpoint } from "../../../Constants/endpoints.contants";
import useNotification from "../../../Hooks/useNotification";
import { validateData } from "../../../Config/GeneralFunctions";

const PrintCustomModal = ({ show, onClose, bookGuid }) => {
  const [data, setData] = useState({});
  const request = useRequest();

  const { showNotification: errorNotification } = useNotification();

  const { startFetching, finishFetching } = useLoaded();

  useEffect(() => {
    if (show) {
      fetchData();
    }
  }, [show]);

  const fetchData = async () => {
    startFetching();
    return await request(
      "get",
      getEndpoint(Endpoints.Copies.allCopies.getAllCodes),
      {
        guid: bookGuid,
      }
    )
      .then((res) => {
        setData({ ...data, codes: res.codes });
      })
      .catch(errorNotification)
      .finally(() => finishFetching());
  };

  const hideModal = () => {
    onClose();
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: +value });
  };

  const checkForm = () => {
    const { rows, cols, offset } = data;
    return validateData([rows, cols, offset]) && rows > 0 && cols > 0;
  };

  return (
    <ModalLayout
      show={show}
      onHide={hideModal}
      size="lm"
      header
      customHeader={
        <div className="d-flex align-items-center justify-content-between w-100">
          <Modal.Title className="ms-2">Customize print</Modal.Title>
        </div>
      }
      footer={
        <div className="d-flex justify-content-end gap-2">
          <Button variant="light" size="lm" onClick={hideModal}>
            Close
          </Button>
          <Button
            disabled={!checkForm()}
            variant="light"
            size="lm"
            onClick={hideModal}
          >
            <PDFDownloadLink
              document={
                <BarcodeLayoutToPrint
                  cols={data.cols}
                  rows={data.rows}
                  offset={data.offset}
                  codes={data.codes?.map((code) => code.uniqid)}
                />
              }
              fileName={`Barcodes${data.codes?.length}-${data.cols}-${data.rows}-${data.offset}.pdf`}
            >
              {({ loading }) =>
                loading ? "Loading document..." : "Download PDF!"
              }
            </PDFDownloadLink>
          </Button>
        </div>
      }
    >
      <div className="mb-1">
        <p>Choose how you want to print the Barcodes.</p>
        <FormControl
          controlId="cols"
          required
          title="Cols"
          vertical={false}
          showMaxLength={false}
          type="number"
          step={1}
          value={data.cols}
          placeholder={"How many Columns?"}
          onChange={handleInput}
          min={1}
        ></FormControl>
        <FormControl
          controlId="rows"
          required
          title="Rows"
          vertical={false}
          showMaxLength={false}
          type="number"
          step={1}
          value={data.rows}
          placeholder={"How many rows?"}
          onChange={handleInput}
          min={1}
        ></FormControl>
        <FormControl
          controlId="offset"
          required
          title="Offset"
          vertical={false}
          showMaxLength={false}
          type="number"
          step={1}
          value={data.offset}
          placeholder={"Where do I start?"}
          max={data.cols * data.rows - 1}
          onChange={handleInput}
          min={0}
        ></FormControl>
      </div>
    </ModalLayout>
  );
};

export default PrintCustomModal;
