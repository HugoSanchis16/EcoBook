// En el componente donde defines `StateDropdown`:
import { getColumnValue } from "../../../../Config/GeneralFunctions";
import StateDropdown from "../../../../Components/StateDropdown/StateDropdown";

export const CopiesColumns = (updateState) => {
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
      Header: "Student",
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <p className="mb-0">{item.fullname || "---"}</p>
        )),
      width: 100,
    },
  ];
  return columns;
};
