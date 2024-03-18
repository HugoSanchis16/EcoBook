import { Button, Dropdown } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  Endpoints,
  getEndpoint,
} from "../../../../Constants/endpoints.contants";
import { Paths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";
import useModalManager from "../../../../Hooks/useModalManager";
import useRequest from "../../../../Hooks/useRequest";
import ProfileModal from "../../../../Modals/ProfileModal/ProfileModal";

const ProfileDropdown = () => {
  const request = useRequest();
  const { isMobileView } = useSelector((state) => state.Config);

  const { push, replace } = useHistory();

  const {
    show: showProfileModal,
    closeModal: closeProfileModal,
    openModal: openProfileModal,
  } = useModalManager();

  const handleSignOut = () => {
    request("post", getEndpoint(Endpoints.Auth.logout))
      .then((res) => {
        localStorage.clear();
        replace(Paths[Views.login].path);
      })
      .catch((err) => errorNotification(err.message));
  };

  const handleOpenProfile = () => push(Paths[Views.profileView].path);

  return (
    <>
      {/* Modals */}
      <ProfileModal show={showProfileModal} onClose={closeProfileModal} />

      {/* Content */}
      {isMobileView ? (
        <Button
          className="d-flex align-items-center text-secondary"
          variant="link"
          onClick={openProfileModal}
        >
          <BsPersonCircle size={20} />
        </Button>
      ) : (
        <Dropdown>
          <Dropdown.Toggle as={Button} variant="link">
            <BsPersonCircle size={20} />
          </Dropdown.Toggle>

          <Dropdown.Menu className="px-2">
            <Dropdown.Item
              className="rounded-3"
              as={Button}
              onClick={handleOpenProfile}
            >
              Profile
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              as={Button}
              variant="danger"
              className="text-danger rounded-3"
              onClick={handleSignOut}
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
};

export default ProfileDropdown;
