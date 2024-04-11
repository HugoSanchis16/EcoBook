import { useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Endpoints, getEndpoint } from "../../Constants/endpoints.contants";
import { Paths } from "../../Constants/paths.constants";
import { Views } from "../../Constants/views.constants";
import { UserContext } from "../../Context/user.context";
import useNotification from "../../Hooks/useNotification";
import useRequest from "../../Hooks/useRequest";
import ModalLayout from "../../Layouts/ModalLayout/ModalLayout";

const ProfileModal = ({ show, onClose }) => {
  const request = useRequest();

  const { push, replace } = useHistory();
  const { showNotification: errorNotification } = useNotification();

  const { user } = useContext(UserContext);

  const handleSignOut = () => {
    request("post", getEndpoint(Endpoints.Auth.logout))
      .then((res) => {
        localStorage.clear();
        replace(Paths[Views.login].path);
      })
      .catch((err) => errorNotification(err.message));
  };

  const handleOpenProfile = () => push(Paths[Views.profileView].path);
  const handleOpenAccount = () => push(Paths[Views.accountView].path);
  const handleOpenSettings = () => push(Paths[Views.settings].path);

  return (
    <ModalLayout
      show={show}
      onHide={onClose}
      size="md"
      bodyClass="p-0 rounded-lg overflow-hidden"
    >
      <div className="w-100 p-4 bg-light bg-gradient">
        <Row>
          <Col sm={4} className="d-flex justify-content-center">
            <img
              alt="profile-avatar"
              className="rounded-circle shadow"
              style={{ width: 120, height: 120 }}
              src={`https://www.gravatar.com/avatar/${user.email}?d=identicon`}
            />
          </Col>
          <Col
            sm={8}
            className="d-flex justify-content-center align-items-center align-items-lg-start flex-column my-4 "
          >
            <h3>{user.fullName}</h3>
            <p className="mb-0">{user.email}</p>
          </Col>
        </Row>
      </div>
      <div className="d-flex flex-column w-100 p-2 mt-2">
        <Button
          variant="outline-light"
          className="py-3 bg-gradient text-start"
          onClick={handleOpenProfile}
        >
          Profile
        </Button>
        <Button
          variant="outline-light"
          className="py-3 bg-gradient text-start"
          onClick={handleOpenAccount}
        >
          Account
        </Button>
        <Button
          onClick={handleOpenSettings}
          variant="outline-light"
          className="py-3 bg-gradient text-start"
        >
          Settings
        </Button>
        <hr />
        <Button
          onClick={handleSignOut}
          variant="outline-danger"
          className="py-2 text-start"
        >
          Log out
        </Button>
      </div>
    </ModalLayout>
  );
};

export default ProfileModal;
