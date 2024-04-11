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

const Account = () => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.User.Account;
  const GeneralStrings = strings.General.App;

  const request = useRequest();

  const { showNotification: successNotification } = useNotification("success");
  const { showNotification: errorNotification } = useNotification();

  const { startFetching, finishFetching, fetching, loaded } = useLoaded();

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    startFetching();
    return await request("get", getEndpoint(Endpoints.user.account.get))
      .then((res) => {
        setData(res.data);
      })
      .catch(errorNotification)
      .finally(() => finishFetching());
  };

  const handleSubmit = () => {
    if (checkForm()) {
      request("post", getEndpoint(Endpoints.user.editUser.update), {
        ...data,
      })
        .then(() => {
          successNotification(ViewStrings.messages.profileUpdated);
        })
        .catch((err) => errorNotification(err.message));
    } else errorNotification("Check all input fields");
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const checkForm = () => {
    return data;
  };

  return (
    <>
      <GeneralLayout title={ViewStrings.title}>
        <PanelLayout loaded={loaded}>
          <SectionLayout title="Security">
            <FormControl
              controlId="currentPassword"
              showMaxLength={false}
              vertical={false}
              title={ViewStrings.inputs.currentPasswordInput.title}
              placeholder={ViewStrings.inputs.currentPasswordInput.placeholder}
              onChange={handleInput}
            />
            <FormControl
              controlId="newPassword"
              vertical={false}
              showMaxLength={false}
              title={ViewStrings.inputs.newPassword.title}
              placeholder={ViewStrings.inputs.newPassword.placeholder}
              onChange={handleInput}
            />
            <FormControl
              controlId="newPasswordCopy"
              vertical={false}
              showMaxLength={false}
              title={ViewStrings.inputs.newPasswordCopy.title}
              placeholder={ViewStrings.inputs.newPasswordCopy.placeholder}
              onChange={handleInput}
            />
          </SectionLayout>
          <SectionLayout title="Email">
            <FormControl
              controlId="currentEmail"
              showMaxLength={false}
              vertical={false}
              title={ViewStrings.inputs.currentEmailInput.title}
              placeholder={ViewStrings.inputs.currentEmailInput.placeholder}
              onChange={handleInput}
            />
            <FormControl
              controlId="newEmail"
              vertical={false}
              showMaxLength={false}
              title={ViewStrings.inputs.newEmail.title}
              placeholder={ViewStrings.inputs.newEmail.placeholder}
              onChange={handleInput}
            />
            <FormControl
              controlId="newEmailCopy"
              vertical={false}
              showMaxLength={false}
              title={ViewStrings.inputs.newEmailCopy.title}
              placeholder={ViewStrings.inputs.newEmailCopy.placeholder}
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

export default Account;
