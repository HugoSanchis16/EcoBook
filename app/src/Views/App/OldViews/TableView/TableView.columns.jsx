import { getColumnValue } from "../../../../Config/GeneralFunctions";

export const TableViewColumns = () => {
  let columns = [
    {
      Header: "Name",
      accessor: "name",
      minWidth: 1,
    },
    {
      Header: "Last Assured",
      accessor: "assured_date",
    },
    {
      Header: "Link",
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <a href={item.url} target="_blank" rel="noreferrer">
            {item.name}
          </a>
        )),
    },
  ];
  return columns;
};
