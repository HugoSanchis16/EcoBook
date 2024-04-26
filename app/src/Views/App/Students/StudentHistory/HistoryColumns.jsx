import { getColumnValue } from "../../../../Config/GeneralFunctions";
import moment from "moment";

export const HistoryColumns = () => {
  const getCopyState = (state) => {
    let stateElement;
    switch (state) {
      case 0:
        stateElement = (
          <span>
            <b>Usless</b>
          </span>
        );
        break;
      case 1:
        stateElement = (
          <span>
            <b>Bad</b>
          </span>
        );
        break;
      case 2:
        stateElement = (
          <span>
            <b>Good</b>
          </span>
        );
        break;
      case 3:
        stateElement = (
          <span>
            <b>Very Good</b>
          </span>
        );
        break;
      case 4:
        stateElement = (
          <span>
            <b>New</b>
          </span>
        );
        break;
      default:
        stateElement = (
          <span className="bg-info-subtle p-2 rounded-5 ">
            <b>In use</b>
          </span>
        );
        break;
    }
    return <p className="mb-0">{stateElement}</p>;
  };

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
        getColumnValue(row, (item) => getCopyState(item.initialstate)),
      width: 100,
    },
    {
      Header: "Final State",
      Cell: (row) =>
        getColumnValue(row, (item) => getCopyState(item.finalstate)),
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
                {moment(item.finaldate, "YYYY-MM-DD HH:mm:SS").format(
                  "DD-MM-YYYY"
                )}
              </span>
            ) : (
              <span className="bg-info-subtle p-2 rounded-5 ">
                <b>In use</b>
              </span>
            )}
          </p>
        )),
      width: 100,
    },
  ];
  return columns;
};
