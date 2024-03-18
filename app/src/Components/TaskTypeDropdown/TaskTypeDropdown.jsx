import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { TaskType } from "../../Utils/TaskType";
import IconButton from "../Buttons/IconButton";

const TaskTypeDropdown = ({ onClick }) => {
  const [selectedType, setSelectedType] = useState(TaskType[0]);

  const handleType = (e) => {
    setSelectedType(e);
    onClick && onClick(e);
  };

  const getTitle = (type = selectedType) => {
    return `${type.icon} ${type.label}`;
  };

  return (
    <Dropdown align="end">
      <DropdownToggle variant="light" className="btn-icon p-0 hide-chevron">
        <IconButton title={getTitle()} />
      </DropdownToggle>
      <DropdownMenu>
        {TaskType.map((type, idx) => (
          <DropdownItem className="bg-transparent w-100 px-2 py-0">
            <IconButton
              key={idx}
              buttonProps={{
                className: "w-100 mb-1",
              }}
              title={getTitle(type)}
              onClick={() => handleType(type)}
            />
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default TaskTypeDropdown;
