import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import IconButton from "../../../../Components/Buttons/IconButton";
import { getColumnValue } from "../../../../Config/GeneralFunctions";
import { Paths, replacePaths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";
import FormSwitch from "../../../../Components/Form/FormSwitch/FormSwitch";

export const BooksColumns = () => {
  const columns = [
    {
      Header: "Name",
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.name}</p>),
      width: 100,
    },
    {
      Header: "Isbn",
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.isbn}</p>),
      width: 100,
    },
    {
      Header: "Stock",
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.stock}</p>),
      width: 100,
    },
    {
      Header: "Enabled",
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <FormSwitch type="switch" value={item.enabled} disabled />
        )),
      width: 50,
    },
    {
      Header: "Actions",
      width: 10,
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <div className="d-flex align-items-center">
            <IconButton
              Icon={MdEdit}
              as={Link}
              to={replacePaths(Paths[Views.edit_book].path, [
                { book_guid: item.guid },
              ])}
            />
          </div>
        )),
    },
  ];
  return columns;
};
