import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import FormControl from "../../../../Components/Form/FormControl/FormControl";
import {
  getOrganisationGuid,
  validateData,
} from "../../../../Config/GeneralFunctions";
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

const NewCategory = () => {
  const { strings: Strings } = useContext(StringsContext);
  const ViewStrings = Strings.Categories.NewCategory;

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
      request("post", getEndpoint(Endpoints.Categories.newCategory.create), {
        ...data,
        org_guid: getOrganisationGuid(),
      })
        .then(() => {
          successNotification(ViewStrings.messages.categoryCreated);
          replace(Paths[Views.categories].path);
        })
        .catch((err) => errorNotification(err.message));
    } else errorNotification("");
  };

  const checkForm = () => {
    const { title, description } = data;
    return validateData([title, description]);
  };

  return (
    <GeneralLayout title={ViewStrings.title}>
      <PanelLayout>
        <FormControl
          controlId="title"
          vertical={false}
          maxLength={50}
          title={ViewStrings.inputs.titleInput.title}
          placeholder={ViewStrings.inputs.titleInput.placeholder}
          onChange={handleText}
        />
        <FormControl
          controlId="description"
          vertical={false}
          as="textarea"
          maxLength={1000}
          title={ViewStrings.inputs.descriptionInput.title}
          placeholder={ViewStrings.inputs.descriptionInput.placeholder}
          onChange={handleText}
        />
        <div className="d-flex justify-content-end align-items-center w-100">
          <Button onClick={handleSubmit} disabled={!checkForm()}>
            {ViewStrings.buttons.create}
          </Button>
        </div>
      </PanelLayout>
    </GeneralLayout>
  );
};

export default NewCategory;
