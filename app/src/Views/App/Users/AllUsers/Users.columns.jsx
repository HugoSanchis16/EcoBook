import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import IconButton from "../../../../Components/Buttons/IconButton";
import { getColumnValue } from "../../../../Config/GeneralFunctions";
import { Paths, replacePaths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";

export const UsersColumns = () => {
  const columns = [
    {
      Header: "Email",
      Cell: (row) => getColumnValue(row, (item) => <p>{item.email}</p>),
      width: "100%",
    },
    {
      Header: "Actions",
      width: 100,
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <div className="d-flex align-items-center justify-content-center">
            <IconButton
              Icon={MdEdit}
              as={Link}
              to={replacePaths(Paths[Views.edit_user].path, [
                { user_guid: item.guid },
              ])}
            />
          </div>
        )),
    },
  ];
  return columns;
};
