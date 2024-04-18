import Barcode from "react-barcode";

const BarcodeComponent = ({ code }) => {
  return (
    <div>
      <h5 className="m-1">Code</h5>
      <div className="d-flex justify-content-center">
        <Barcode width="2" fontSize="18" value={code} />
      </div>
    </div>
  );
};

export default BarcodeComponent;
