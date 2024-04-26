// En el componente donde defines `StateDropdown`:
import { getColumnValue } from "../../../../Config/GeneralFunctions";
import StateDropdown from "../../../../Components/StateDropdown/StateDropdown";
import IconButton from "../../../../Components/Buttons/IconButton";
import { IoIosBarcode } from "react-icons/io";
import { BiSolidPrinter } from "react-icons/bi";
import { LuHistory } from "react-icons/lu";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Paths, replacePaths } from "../../../../Constants/paths.constants";
import { Endpoints } from "../../../../Constants/endpoints.contants";
import { Views } from "../../../../Constants/views.constants";
import { MdRemoveRedEye } from "react-icons/md";

export const CopiesColumns = (
  updateState,
  openBarcodeModal,
  openPrintCustomIndividualModal
) => {
  const columns = [
    {
      Header: "Codigo",
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.uniqid}</p>),
      width: 150,
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
      width: 150,
    },
    {
      Header: "Action",
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <div className="d-flex align-items-center gap-3">
            <div>
              <IconButton
                Icon={MdRemoveRedEye}
                as={Link}
                to={replacePaths(Paths[Views.copy_info].path, [
                  { copy_uniqid: item.uniqid },
                ])}
              />
            </div>
            <div className="d-flex align-items-center">
              <IconButton
                Icon={IoIosBarcode}
                onClick={() => openBarcodeModal(item.uniqid)}
              />
              <IconButton
                Icon={BiSolidPrinter}
                onClick={() => openPrintCustomIndividualModal(item.uniqid)}
              />
            </div>
          </div>
        )),
      width: 100,
    },
  ];
  return columns;
};
