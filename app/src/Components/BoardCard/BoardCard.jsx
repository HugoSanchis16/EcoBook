import { Button, Card, Image } from "react-bootstrap";
import { MdOutlineMoreVert, MdOutlineStarOutline } from "react-icons/md";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Paths, replacePaths } from "../../Constants/paths.constants";
import { Views } from "../../Constants/views.constants";

const USER_AMOUNT_IN_CARD = 4;

const BoardCard = ({ board }) => {
  const { push } = useHistory();

  const openBoard = () => {
    push(
      replacePaths(Paths[Views.board_overview], [
        { board_guid: board.guid },
      ])
    );
  };

  return (
    <Card className="p-0 mb-2">
      <Card.Header className="d-flex align-items-center justify-content-between bg-transparent border-bottom-0 p-0">
        <Button onClick={openBoard} className="p-3 w-100" variant="link">
          <h5 className="mb-0 text-start">{board.name}</h5>
        </Button>
        <div className="d-flex align-items-center justify-content-center">
          <Button variant="link">
            <MdOutlineStarOutline size={20} />
          </Button>
          <Button variant="link">
            <MdOutlineMoreVert size={20} />
          </Button>
        </div>
      </Card.Header>
      <Card.Body className="pt-0">
        <div
          className="overflow-hidden"
          style={{
            maxWidth: "80%",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {board.description}
        </div>

        <div
          className="d-flex align-items-center justify-content-start mt-3"
          style={{ userSelect: "none" }}
        >
          {board.users.slice(0, USER_AMOUNT_IN_CARD).map((user, idx) => (
            <Image
              title={user.fullName}
              className="rounded-circle shadow"
              src={user.avatar}
              style={{ width: 35, height: 35, margin: idx === 0 ? 0 : -15 }}
            />
          ))}
          {board.users_count > USER_AMOUNT_IN_CARD && (
            <div
              title={`${
                board.users_count - board.users.length
              } more users in table`}
              className="rounded-circle d-flex align-items-center justify-content-center shadow"
              style={{
                width: 35 + 2,
                height: 35 + 2,
                background: "#eee",
                margin: -15,
              }}
            >
              <small className="text-muted">{`+ ${
                board.users_count - board.users.length
              }`}</small>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};
export default BoardCard;
