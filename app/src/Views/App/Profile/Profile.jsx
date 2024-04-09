import { useContext, useEffect, useState } from "react";
import useRequest from "../../../Hooks/useRequest";
import useNotification from "../../../Hooks/useNotification";
import useLoaded from "../../../Hooks/useLoaded";
import PanelLayout from "../../../Layouts/PanelLayout/PanelLayout";
import GeneralLayout from "../../../Layouts/GeneralLayout/GeneralLayout";
import { StringsContext } from "../../../Context/strings.context";
import { Endpoints, getEndpoint } from "../../../Constants/endpoints.contants";
import FormControl from "../../../Components/Form/FormControl/FormControl";
import { validateData } from "../../../Config/GeneralFunctions";
import { Button } from "react-bootstrap";
import { PhoneRegexSpain } from "../../../Utils/Regex";
import SectionLayout from "../../../Layouts/SectionLayout/SectionLayout";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Views } from "react-big-calendar";
import { Paths } from "../../../Constants/paths.constants";

const Profile = () => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.User.Profile;
  const GeneralStrings = strings.General.App;

  const request = useRequest();

  const { showNotification: successNotification } = useNotification("success");
  const { showNotification: errorNotification } = useNotification();

  const { startFetching, finishFetching, fetching, loaded } = useLoaded();

  const [profile, setProfile] = useState([]);
  const { push } = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    startFetching();
    return await request("get", getEndpoint(Endpoints.user.profile.get))
      .then((res) => {
        setProfile(res.profile);
      })
      .catch(errorNotification)
      .finally(() => finishFetching());
  };

  const handleSubmit = () => {
    if (checkForm()) {
      request("post", getEndpoint(Endpoints.user.editUser.update), {
        ...profile,
      })
        .then(() => {
          successNotification(ViewStrings.messages.profileUpdated);
        })
        .catch((err) => errorNotification(err.message));
    } else errorNotification("Check all input fields");
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    setProfile({ ...profile, [id]: value });
  };

  const checkForm = () => {
    const { name, surnames, phone } = profile;
    return validateData([name, surnames, phone]) && PhoneRegexSpain.test(phone);
  };

  return (
    <>
      {console.log(profile)}

      <GeneralLayout title={ViewStrings.title}>
        <PanelLayout loaded={loaded}>
          <SectionLayout title="Basic user information">
            <FormControl
              controlId="name"
              maxLength={50}
              showMaxLength
              vertical={false}
              value={profile.name}
              title={ViewStrings.inputs.nameInput.title}
              placeholder={ViewStrings.inputs.nameInput.placeholder}
              onChange={handleInput}
            />
            <FormControl
              controlId="surnames"
              maxLength={50}
              showMaxLength
              vertical={false}
              value={profile.surnames}
              title={ViewStrings.inputs.surnameInput.title}
              placeholder={ViewStrings.inputs.surnameInput.placeholder}
              onChange={handleInput}
            />
            <FormControl
              controlId="phone"
              maxLength={9}
              showMaxLength
              vertical={false}
              value={profile.phone}
              title={ViewStrings.inputs.phoneInput.title}
              placeholder={ViewStrings.inputs.phoneInput.placeholder}
              onChange={handleInput}
            />
          </SectionLayout>
          <div className="d-flex justify-content-end w-100 align-items-center">
            <Button disabled={!checkForm()} onClick={handleSubmit}>
              {GeneralStrings.Update}
            </Button>
          </div>
        </PanelLayout>
      </GeneralLayout>
    </>
  );
};

export default Profile;
