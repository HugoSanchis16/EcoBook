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
import {
  EmailRegex,
  PasswordRegex,
  PhoneRegexSpain,
} from "../../../Utils/Regex";
import SectionLayout from "../../../Layouts/SectionLayout/SectionLayout";
import { Paths } from "../../../Constants/paths.constants";
import { Views } from "../../../Constants/views.constants";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Account = () => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.User.Account;
  const GeneralStrings = strings.General.App;

  const request = useRequest();

  const { replace } = useHistory();

  const { showNotification: successNotification } = useNotification("success");
  const { showNotification: errorNotification } = useNotification();

  const [data, setData] = useState([]);

  const handleSubmitEmail = () => {
    if (checkFormEmail()) {
      request("post", getEndpoint(Endpoints.user.editEmail.update), {
        currentEmail: data.currentEmail,
        newEmail: data.newEmail,
      })
        .then(() => {
          successNotification(ViewStrings.messages.profileUpdated);
          replace(Paths[Views.login].path);
        })
        .catch((err) => errorNotification(err.message));
    } else errorNotification("Check all input fields");
  };

  const handleSubmitPassword = () => {
    if (checkFormPassword()) {
      request("post", getEndpoint(Endpoints.user.editPassword.update), {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      })
        .then(() => {
          successNotification(ViewStrings.messages.profileUpdated);
          replace(Paths[Views.login].path);
        })
        .catch((err) => errorNotification(err.message));
    } else errorNotification("Check all input fields");
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const checkFormEmail = () => {
    const { currentEmail, newEmail, newEmailCopy } = data;
    return (
      validateData([currentEmail, newEmail, newEmailCopy]) &&
      EmailRegex.test(currentEmail) &&
      EmailRegex.test(newEmail) &&
      EmailRegex.test(newEmailCopy) &&
      currentEmail !== newEmail &&
      newEmail === newEmailCopy
    );
  };

  const checkFormPassword = () => {
    const { currentPassword, newPassword, newPasswordCopy } = data;
    return (
      validateData([currentPassword, newPassword, newPasswordCopy]) &&
      PasswordRegex.test(currentPassword) &&
      PasswordRegex.test(newPassword) &&
      PasswordRegex.test(newPasswordCopy) &&
      currentPassword !== newPassword &&
      newPassword === newPasswordCopy
    );
  };

  return (
    <GeneralLayout title={ViewStrings.title}>
      <PanelLayout>
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
          <div className="d-flex justify-content-end w-100 align-items-center">
            <Button disabled={!checkFormEmail()} onClick={handleSubmitEmail}>
              {ViewStrings.inputs.changeEmailButton.title}
            </Button>
          </div>
        </SectionLayout>
        <SectionLayout title="Password">
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
          <div className="d-flex justify-content-end w-100 align-items-center">
            <Button
              disabled={!checkFormPassword()}
              onClick={handleSubmitPassword}
            >
              {ViewStrings.inputs.changePasswordButton.title}
            </Button>
          </div>
        </SectionLayout>
      </PanelLayout>
    </GeneralLayout>
  );
};

export default Account;
