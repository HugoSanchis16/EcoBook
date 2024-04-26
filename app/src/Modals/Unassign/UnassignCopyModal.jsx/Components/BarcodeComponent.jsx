import Barcode from "react-barcode";

const BarcodeComponent = ({ code, notitle = false, size = 2 }) => {
  return (
    <div>
      {notitle ? "" : <h5 className="m-1">Code</h5>}
      <div className="d-flex justify-content-center">
        <Barcode width={size} fontSize="18" value={code} />
      </div>
    </div>
  );
};

export default BarcodeComponent;
