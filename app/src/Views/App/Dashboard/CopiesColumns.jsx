import { MdDelete, MdEdit, MdRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import IconButton from "../../../Components/Buttons/IconButton";
import { getColumnValue } from "../../../Config/GeneralFunctions";
import { Paths, replacePaths } from "../../../Constants/paths.constants";
import { Views } from "../../../Constants/views.constants";
import FormSwitch from "../../../Components/Form/FormSwitch/FormSwitch";
import { useContext } from "react";
import { StringsContext } from "../../../Context/strings.context";
import StarsComponent from "../Copy/CopyInfo/Components/Stars";

export const CopiesColumnsDashboard = () => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.Books.AllBooks;

  const columns = [
    {
      Header: "Code",
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.uniqid}</p>),
      width: 100,
    },
    {
      Header: "State",
      Cell: (row) =>
        getColumnValue(row, (item) => <StarsComponent state={item.state} />),
      width: 100,
    },
    {
      Header: "Book",
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.bookName}</p>),
      width: 100,
    },
    {
      Header: "Course",
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <p className="mb-0">{item.courseName}</p>
        )),
      width: 100,
    },
    {
      Header: "Subject",
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <p className="mb-0">{item.subjectName}</p>
        )),
      width: 100,
    },
    {
      Header: "Action",
      width: 10,
      Cell: (row) =>
        getColumnValue(row, (item) => <IconButton Icon={MdDelete} />),
    },
  ];
  return columns;
};
