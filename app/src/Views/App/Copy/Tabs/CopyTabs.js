import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Paths, replacePaths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";
import Tabs from "../../../../Components/Tabs/Tabs";

export const CopyTabs = () => {
  const { copy_uniqid } = useParams();

  const tabs = [
    {
      id: "copy_info",
      title: "Info",
      path: replacePaths(Paths[Views.copy_info].path, [{ copy_uniqid }]),
    },
    {
      id: "copy_history",
      title: "History",
      path: replacePaths(Paths[Views.copy_history].path, [{ copy_uniqid }]),
    },
  ];

  return Tabs({ tabs });
};
