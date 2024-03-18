import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import FormControl from "../../../../Components/Form/FormControl/FormControl";
import FormSelect from "../../../../Components/Form/FormSelect/FormSelect";
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

const NewUser = () => {
  const { strings: Strings } = useContext(StringsContext);
  const ViewStrings = Strings.Users.NewUser;

  const request = useRequest();
  const { replace } = useHistory();

  const { showNotification: successNotification } = useNotification("success");
  const { showNotification: errorNotification } = useNotification();

  const [orgsAvailable, setOrgsAvailable] = useState([]);

  const [data, setData] = useState({});

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchOrgs();
  }, []);

  const fetchOrgs = () => {
    request("get", getEndpoint(Endpoints.Organisation.other.getAllSelect))
      .then((res) => setOrgsAvailable(res.data))
      .catch((err) => errorNotification(err.message))
      .finally(() => setLoaded(true));
  };

  const handleText = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleSubmit = () => {
    if (checkForm()) {
      request("post", getEndpoint(Endpoints.Users.newUser.create), {
        ...data,
      })
        .then(() => {
          successNotification(ViewStrings.messages.userCreated);
          replace(Paths[Views.users].path);
        })
        .catch((err) => errorNotification(err.message));
    } else errorNotification("");
  };

  const checkForm = () => {
    const { email, organisation } = data;
    return validateData([email, organisation]);
  };

  return (
    <GeneralLayout title={ViewStrings.title}>
      <PanelLayout loaded={loaded}>
        <SectionLayout title={ViewStrings.sections.accountSection}>
          <FormControl
            controlId="email"
            vertical={false}
            title={ViewStrings.inputs.emailInput.title}
            placeholder={ViewStrings.inputs.emailInput.placeholder}
            onChange={handleText}
          />
          <FormSelect
            controlId="organisation"
            vertical={false}
            title={ViewStrings.inputs.organisationInput.title}
            placeholder={ViewStrings.inputs.organisationInput.placeholder}
            options={orgsAvailable}
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

export default NewUser;
