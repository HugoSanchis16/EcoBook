import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
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

const EditPlayer = () => {
  const { strings: Strings } = useContext(StringsContext);
  const GeneralStrings = Strings.General.App;
  const ViewStrings = Strings.Players.EditPlayer;

  const request = useRequest();
  const { push } = useHistory();

  const { player_guid } = useParams();

  const { showNotification: successNotification } = useNotification("success");
  const { showNotification: errorNotification } = useNotification();

  const [data, setData] = useState({});
  const [orgsAvailable, setOrgsAvailable] = useState([]);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetchOrgs();
    await fetchPlayer();
    setLoaded(true);
  };

  const fetchPlayer = async () => {
    return await request("get", getEndpoint(Endpoints.Players.editPlayer.get), {
      guid: player_guid,
    })
      .then((res) => setData(res.data))
      .catch((err) => errorNotification(err.message));
  };

  const fetchOrgs = async () => {
    return await request(
      "get",
      getEndpoint(Endpoints.Organisation.other.getAllSelect)
    )
      .then((res) => setOrgsAvailable(res.data))
      .catch((err) => errorNotification(err.message));
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleSubmit = () => {
    if (checkForm()) {
      request("post", getEndpoint(Endpoints.Players.editPlayer.update), {
        ...data,
      })
        .then(() => successNotification(ViewStrings.messages.playerUpdated))
        .then(() => push(Paths[Views.players].path))
        .catch((err) => errorNotification(err.message));
    } else errorNotification("Check all input fields");
  };

  const checkForm = () => {
    const { name, lastname } = data;
    return validateData([name, lastname]);
  };

  return (
    <GeneralLayout title={ViewStrings.title}>
      <PanelLayout loaded={loaded}>
        <SectionLayout title="Basic Info">
          <FormControl
            controlId="name"
            maxLength={50}
            showMaxLength
            vertical={false}
            value={data.name}
            title={ViewStrings.inputs.nameInput.title}
            placeholder={ViewStrings.inputs.nameInput.placeholder}
            onChange={handleInput}
          />
          <FormControl
            controlId="lastname"
            maxLength={200}
            showMaxLength
            vertical={false}
            value={data.lastname}
            title={ViewStrings.inputs.lastNameInput.title}
            placeholder={ViewStrings.inputs.lastNameInput.placeholder}
            onChange={handleInput}
          />
          <FormControl
            controlId="phone"
            vertical={false}
            value={data.phone}
            title={ViewStrings.inputs.phoneInput.title}
            placeholder={ViewStrings.inputs.phoneInput.placeholder}
            onChange={handleInput}
          />
          <FormControl
            controlId="dni"
            vertical={false}
            value={data.dni}
            title={ViewStrings.inputs.dniInput.title}
            placeholder={ViewStrings.inputs.dniInput.placeholder}
            onChange={handleInput}
          />
          <FormControl
            controlId="age"
            vertical={false}
            type="number"
            value={data.age}
            title={ViewStrings.inputs.ageInput.title}
            placeholder={ViewStrings.inputs.ageInput.placeholder}
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
  );
};

export default EditPlayer;
