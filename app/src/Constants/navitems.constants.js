import { Paths } from "./paths.constants";
import { Views } from "./views.constants";

/**
 * Item structure will contains:
 * @string id: mandatory and unique
 * @string title: mandatory
 * @array items: Mandatory when no children key exist in the object
 * @array children: Mandatory when no items key exist in the object. Will must contains object og "item" type
 */

export const NavItems = () => {
  const items = [
    {
      id: "dashboard_section",
      title: "Dashboard",
      items: [
        Paths[Views.home],
      ],
    },
    {
      id: "administration_section",
      title: "Administration",
      items: [
        Paths[Views.books],
        Paths[Views.students],
        Paths[Views.courses],
        Paths[Views.subjects],
      ],
    }
  ];
  return items;
};
