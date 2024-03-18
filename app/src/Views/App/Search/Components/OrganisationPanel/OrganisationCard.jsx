import { Card } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import IconButton from "../../../../../Components/Buttons/IconButton";
import { Paths, replacePaths } from "../../../../../Constants/paths.constants";
import { Views } from "../../../../../Constants/views.constants";

const OrganisationCard = ({ name, description, guid, enabled }) => {
  return (
    <Card>
      <Card.Header className="bg-secondary bg-gradient">
        <Card.Title className="text-light mb-3">{name}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <Card.Footer className="bg-white d-flex justify-content-between">
        <p className="mb-0 px-2 d-flex align-items-center bg-light shadow-sm rounded-2">
          {enabled ? "🟢" : "🔴"}
        </p>
        <IconButton
          Icon={MdEdit}
          as={Link}
          to={replacePaths(Paths[Views.edit_organisation].path, [
            { organisation_guid: guid },
          ])}
        />
      </Card.Footer>
    </Card>
  );
};

export default OrganisationCard;
