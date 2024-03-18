import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import FormControl from "../../../../Components/Form/FormControl/FormControl";
import { validateData } from "../../../../Config/GeneralFunctions";
import {
  Endpoints,
  getEndpoint,
} from "../../../../Constants/endpoints.contants";
import { Paths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";
import { StringsContext } from "../../../../Context/strings.context";
import useNotification from "../../../../Hooks/useNotification";
import useRequest from "../../../../Hooks/useRequest";
import GeneralLayout from "../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../Layouts/PanelLayout/PanelLayout";
import SectionLayout from "../../../../Layouts/SectionLayout/SectionLayout";
import { EmailRegex } from "../../../../Utils/Regex";

const NewPlayer = () => {
  const { strings: Strings } = useContext(StringsContext);
  const ViewStrings = Strings.Players.NewPlayer;

  const request = useRequest();
  const { replace } = useHistory();

  const { showNotification: successNotification } = useNotification("success");
  const { showNotification: errorNotification } = useNotification();

  const [data, setData] = useState({});

  const handleText = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleSubmit = () => {
    if (checkForm()) {
      request("post", getEndpoint(Endpoints.Players.newPlayer.create), {
        ...data,
      })
        .then(() => {
          successNotification(ViewStrings.messages.playerCreated);
          replace(Paths[Views.players].path);
        })
        .catch((err) => errorNotification(err.message));
    } else errorNotification("");
  };

  const checkForm = () => {
    const { email, name, lastname } = data;
    return validateData([email, name, lastname]) && EmailRegex.test(email);
  };

  return (
    <GeneralLayout title={ViewStrings.title}>
      <PanelLayout>
        <SectionLayout title={ViewStrings.sections.accountSection}>
          <FormControl
            controlId="name"
            vertical={false}
            title={ViewStrings.inputs.nameInput.title}
            placeholder={ViewStrings.inputs.nameInput.placeholder}
            onChange={handleText}
          />
          <FormControl
            controlId="lastname"
            vertical={false}
            title={ViewStrings.inputs.lastNameInput.title}
            placeholder={ViewStrings.inputs.lastNameInput.placeholder}
            onChange={handleText}
          />
          <FormControl
            controlId="email"
            vertical={false}
            title={ViewStrings.inputs.emailInput.title}
            placeholder={ViewStrings.inputs.emailInput.placeholder}
            onChange={handleText}
          />
        </SectionLayout>
        <div className="d-flex justify-content-end align-items-center w-100">
          <Button onClick={handleSubmit} disabled={!checkForm()}>
            {ViewStrings.buttons.create}
          </Button>
        </div>
      </PanelLayout>
    </GeneralLayout>
  );
};

export default NewPlayer;
