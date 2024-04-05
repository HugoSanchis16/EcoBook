import { MdDelete, MdEdit, MdRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import IconButton from "../../../../Components/Buttons/IconButton";
import { getColumnValue } from "../../../../Config/GeneralFunctions";
import { Paths, replacePaths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";
import FormSwitch from "../../../../Components/Form/FormSwitch/FormSwitch";

export const BooksColumns = (openDeleteModal) => {
  const columns = [
    {
      Header: "Name",
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.name}</p>),
      width: 100,
    },
    {
      Header: "ISBN",
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
          <div className="d-flex align-items-center gap-3">
            <IconButton
              Icon={MdRemoveRedEye}
              as={Link}
              to={replacePaths(Paths[Views.copies].path, [
                { book_guid: item.guid },
              ])}
            />
            <div className="d-flex align-items-center ">
              <IconButton
                Icon={MdEdit}
                as={Link}
                to={replacePaths(Paths[Views.edit_book].path, [
                  { book_guid: item.guid },
                ])}
              />
              <IconButton
                Icon={MdDelete}
                onClick={() => openDeleteModal(item.guid)}
              />
            </div>
          </div>
        )),
    },
  ];
  return columns;
};
