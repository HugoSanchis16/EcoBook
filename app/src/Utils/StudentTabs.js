import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Paths, replacePaths } from "../Constants/paths.constants";
import { Views } from "../Constants/views.constants";
import Tabs from "../Components/Tabs/Tabs";

export const StudentTabs = () => {
  const { student_guid } = useParams();

  const tabs = [
    {
      id: "student_info",
      title: "Info",
      path: replacePaths(Paths[Views.edit_student].path, [{ student_guid }]),
    },
    {
      id: "student_history",
      title: "History",
      path: replacePaths(Paths[Views.student_history].path, [{ student_guid }]),
    },
  ];

  return Tabs({ tabs });
};
