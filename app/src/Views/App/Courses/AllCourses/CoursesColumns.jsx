import { MdCenterFocusStrong, MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import IconButton from "../../../../Components/Buttons/IconButton";
import { getColumnValue } from "../../../../Config/GeneralFunctions";
import { Paths, replacePaths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";

export const CoursesColumns = (openDeleteModal) => {
  const columns = [
    {
      Header: "Abbreviation",
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.abbr}</p>),
      width: 50,
    },
    {
      Header: "Season",
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.season}</p>),
      width: 50,
    },
    {
      Header: "Name",
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.name}</p>),
      width: 100,
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
              to={replacePaths(Paths[Views.edit_course].path, [
                { course_guid: item.guid },
              ])}
            />
            <IconButton
              Icon={MdDelete}
              onClick={() => openDeleteModal(item.guid)}
            />
          </div>
        )),
    },
  ];
  return columns;
};
