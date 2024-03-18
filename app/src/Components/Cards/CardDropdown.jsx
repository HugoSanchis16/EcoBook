import { Dropdown } from "react-bootstrap";
import { MdMoreHoriz } from "react-icons/md";
import IconButton from "../Buttons/IconButton";

const CardDropdown = () => {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="light" className="btn-icon p-0 hide-chevron">
        <IconButton Icon={MdMoreHoriz} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CardDropdown;
