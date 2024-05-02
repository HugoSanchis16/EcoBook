import { Button, Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  Endpoints,
  getEndpoint,
} from "../../../../Constants/endpoints.contants";
import { Paths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";
import useRequest from "../../../../Hooks/useRequest";
import { useEffect, useState } from "react";
import useNotification from "../../../../Hooks/useNotification";
import useLoaded from "../../../../Hooks/useLoaded";

const ProfileDropdown = () => {
  const request = useRequest();
  const { isMobileView } = useSelector((state) => state.Config);

  const { push, replace } = useHistory();
  const [profile, setProfile] = useState([]);
  const { showNotification: errorNotification } = useNotification();
  const { finishFetching } = useLoaded();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    return await request("get", getEndpoint(Endpoints.user.profile.get))
      .then((res) => {
        setProfile(res.profile);
      })
      .catch(errorNotification)
      .finally(() => finishFetching());
  };

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

  return (
    <>
      {/* Content */}
      {isMobileView ? (
        <Button
          className="d-flex align-items-center text-secondary"
          variant="link"
        >
          <img
            className="rounded-circle"
            src={
              profile.avatar ||
              `https://www.gravatar.com/avatar/${profile.name}?d=identicon`
            }
            alt="Profile"
            width={25}
            height={25}
            style={{}}
          />
        </Button>
      ) : (
        <Dropdown>
          <Dropdown.Toggle as={Button} variant="link">
            <img
              className="rounded-circle"
              src={
                profile.avatar ||
                `https://www.gravatar.com/avatar/${profile.name}?d=identicon`
              }
              alt="Profile"
              width={25}
              height={25}
              style={{}}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu className="px-2">
            <Dropdown.Item
              className="rounded-3"
              as={Button}
              onClick={handleOpenProfile}
            >
              Profile
            </Dropdown.Item>
            <Dropdown.Item
              className="rounded-3"
              as={Button}
              onClick={handleOpenAccount}
            >
              Account
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
