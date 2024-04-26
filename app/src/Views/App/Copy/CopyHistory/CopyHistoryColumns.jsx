import { getColumnValue } from "../../../../Config/GeneralFunctions";

import IconButton from "../../../../Components/Buttons/IconButton";
import { TbReport } from "react-icons/tb";

export const CopyHistoryColumns = (openHistoryModal) => {
  const columns = [
    {
      Header: "Season",
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.season} </p>),
      width: 125,
    },
    {
      Header: "NIA",
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <p className="mb-0">{item.student_nia} </p>
        )),
      width: 125,
    },
    {
      Header: "Name",
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <p className="mb-0">{item.student_name} </p>
        )),
      width: 150,
    },
    {
      Header: "Email",
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <p className="mb-0">{item.student_email} </p>
        )),
      width: 150,
    },
    {
      Header: "Action",
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <div className="d-flex align-items-center">
            {console.log(item)}
            <IconButton
              Icon={TbReport}
              onClick={() => openHistoryModal(item)}
            />
          </div>
        )),
      width: 100,
    },
  ];
  return columns;
};
