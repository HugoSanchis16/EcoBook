import { useMemo } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Paths, replacePaths } from "../../Constants/paths.constants";
import { Views } from "../../Constants/views.constants";
import { TaskType } from "../../Utils/TaskType";
import IconButton from "../Buttons/IconButton";
import CardDropdown from "./CardDropdown";

const CardItem = ({ guid, title, cover, uniquecode, type }) => {
  const { board_guid } = useParams();

  const taskType = useMemo(
    () => TaskType.find((item) => item.value === type),
    []
  );
  return (
    <Card className=" position-relative rounded-lg shadow-sm mb-2">
      {/* TODO: Add card cover by using card.header element */}
      <Card.Header
        style={{
          background: `url(${cover})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: cover ? 150 : "100%",
        }}
        className="p-1 px-2 d-flex justify-content-between border-bottom-0 align-items-start w-100"
      >
        <IconButton overlay={taskType.label} title={taskType.icon} />
        <CardDropdown />
      </Card.Header>
      <Card.Body>
        <Button
          as={Link}
          to={replacePaths(Paths[Views.card_overview], [
            { board_guid },
            { card_guid: guid },
          ])}
          variant="link"
          className="p-0 bg-transparent text-dark fw-normal text-start"
        >
          <span className="h5 fw-normal">{title}</span>
        </Button>
      </Card.Body>
      <Card.Footer className="rounded-lg border-0 bg-white d-flex justify-content-between align-items-center w-100">
        <small>{uniquecode}</small>
      </Card.Footer>
    </Card>
  );
};

export default CardItem;
