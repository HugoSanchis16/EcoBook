// En el componente donde defines `StateDropdown`:
import { getColumnValue } from "../../../../Config/GeneralFunctions";
import StateDropdown from "../../../../Components/StateDropdown/StateDropdown";
import IconButton from "../../../../Components/Buttons/IconButton";
import { IoIosBarcode } from "react-icons/io";

export const CopiesColumns = (updateState, openBarcodeModal) => {
  const columns = [
    {
      Header: "Codigo",
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.uniqid}</p>),
      width: 100,
    },
    {
      Header: "State",
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <div>
            <StateDropdown
              onClick={(selectedOption) =>
                updateState(item.guid, selectedOption)
              }
              statusSelected={item.state}
            />
          </div>
        )),
      width: 100,
    },
    {
      Header: "Action",
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <div className="d-flex align-items-center ">
            <IconButton
              Icon={IoIosBarcode}
              onClick={() => openBarcodeModal(item.uniqid)}
            />
          </div>
        )),
      width: 100,
    },
  ];
  return columns;
};
