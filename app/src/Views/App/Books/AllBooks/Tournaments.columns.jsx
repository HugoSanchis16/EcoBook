import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import IconButton from "../../../../Components/Buttons/IconButton";
import { getColumnValue } from "../../../../Config/GeneralFunctions";
import { Paths, replacePaths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";

export const TournamentsColumns = () => {
  const columns = [
    {
      Header: "Full Name",
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.fullname}</p>),
    },
    {
      Header: "Email",
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.email}</p>),
      width: 250,
    },
    {
      Header: "Rank",
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <p className="mb-0">{item.padelcrownrank}</p>
        )),
      width: 50,
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
              to={replacePaths(Paths[Views.edit_player].path, [
                { player_guid: item.guid },
              ])}
            />
          </div>
        )),
    },
  ];
  return columns;
};
