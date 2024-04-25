import { MdDelete, MdEdit, MdRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import IconButton from "../../../../Components/Buttons/IconButton";
import { getColumnValue } from "../../../../Config/GeneralFunctions";
import { Paths, replacePaths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";
import BarcodeComponent from "../../../../Modals/Unassign/UnassignCopyModal.jsx/Components/BarcodeComponent";
import moment from "moment";

export const HistoryColumns = () => {
  const columns = [
    {
      Header: "Book",
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <p className="mb-0">{item.book_name} </p>
        )),
      width: 125,
    },
    {
      Header: "Code",
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.uniqid} </p>),
      width: 100,
    },
    {
      Header: "Initial State",
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <p className="mb-0">{item.initialstate} </p>
        )),
      width: 100,
    },
    {
      Header: "Final State",
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <p className="mb-0">
            {item.finalstate != null ? (
              <span>{item.initialstate}</span>
            ) : (
              <span className="bg-info-subtle p-1 rounded-3 ">In use</span>
            )}
          </p>
        )),
      width: 100,
    },
    {
      Header: "Initial Date",
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <p className="mb-0">
            {moment(item.initialdate, "YYYY-MM-DD HH:mm:SS").format(
              "DD-MM-YYYY"
            )}
          </p>
        )),
      width: 100,
    },
    {
      Header: "Final Date",
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <p className="mb-0">
            {item.finaldate != null ? (
              <span>
                {" "}
                {moment(item.finaldate, "YYYY-MM-DD HH:mm:SS").format(
                  "DD-MM-YYYY"
                )}
              </span>
            ) : (
              <span className="bg-info-subtle p-1 rounded-3 ">In use</span>
            )}
          </p>
        )),
      width: 100,
    },
  ];
  return columns;
};
