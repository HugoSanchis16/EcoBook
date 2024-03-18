import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import IconButton from "../../../../Components/Buttons/IconButton";
import { getColumnValue } from "../../../../Config/GeneralFunctions";
import { Paths, replacePaths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";

export const CategoriesColumns = () => {
  const columns = [
    {
      Header: "Title",
      width: "100%",
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.title}</p>),
    },
    {
      Header: "Actions",
      width: 50,
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <div className="d-flex align-items-center">
            <IconButton
              Icon={MdEdit}
              as={Link}
              to={replacePaths(Paths[Views.edit_category].path, [
                { category_guid: item.guid },
              ])}
            />
          </div>
        )),
    },
  ];
  return columns;
};
