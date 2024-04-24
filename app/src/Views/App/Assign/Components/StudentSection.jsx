import { useContext, useState } from "react";
import FormControl from "../../../../Components/Form/FormControl/FormControl";
import SectionLayout from "../../../../Layouts/SectionLayout/SectionLayout";
import { StringsContext } from "../../../../Context/strings.context";
import IconButton from "../../../../Components/Buttons/IconButton";
import { MdBarcodeReader } from "react-icons/md";
import { BsFillWebcamFill } from "react-icons/bs";
import useModalManager from "../../../../Hooks/useModalManager";
import ShowScanBarcodeModal from "../../../../Modals/BarcodeCopies/ShowScanBarcodeModal/ShowScanBarcodeModal";

const StudentSection = ({ setData, data }) => {
  const { strings: Strings } = useContext(StringsContext);
  const GeneralStrings = Strings.General.App;
  const ViewStrings = Strings.Assign.NewAssign;

  const [scanning, setScanning] = useState(false);

  const [isScanningEnabled, setIsScanningEnabled] = useState(false);

  const {
    closeModal: closeScanModal,
    openModal: openScanModal,
    show: showScanModal,
  } = useModalManager();

  const handleInput = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleCheck = () => {
    if (scanning) {
      document.getElementById("nia").blur();
    } else {
      document.getElementById("nia").focus();
    }
    setScanning((prevValue) => !prevValue);
  };

  const handleOpenScanModal = ({ isScanningEnabled }) => {
    openScanModal({ setIsScanningEnabled, isScanningEnabled });
  };

  const handleCloseScanModal = (uniqid) => {
    closeScanModal();
    if (uniqid) {
      console.log(uniqid);
      setData({ ...data, nia: uniqid });
    }
  };

  return (
    <div>
      <ShowScanBarcodeModal
        show={showScanModal}
        onClose={handleCloseScanModal}
        isScanningEnabled={isScanningEnabled}
        setIsScanningEnabled={setIsScanningEnabled}
      />

      <SectionLayout
        title="Student's Identification"
        rightSection={
          <div className="d-flex gap-3">
            <IconButton
              title={scanning ? "Scanning..." : "Scan with reader"}
              Icon={MdBarcodeReader}
              onClick={handleCheck}
            ></IconButton>
            <IconButton
              Icon={BsFillWebcamFill}
              title={isScanningEnabled ? "Scanning..." : " Scan with webcam"}
              onClick={handleOpenScanModal}
            />
          </div>
        }
      >
        <FormControl
          required
          controlId="nia"
          maxLength={8}
          showMaxLength={true}
          vertical={false}
          value={data.nia}
          title={ViewStrings.inputs.niaInput.title}
          placeholder={ViewStrings.inputs.niaInput.placeholder}
          onChange={handleInput}
        />
      </SectionLayout>
    </div>
  );
};

export default StudentSection;
