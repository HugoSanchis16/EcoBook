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

const EditCategory = () => {
  const { strings: Strings } = useContext(StringsContext);
  const GeneralStrings = Strings.General.App;
  const ViewStrings = Strings.Categories.EditCategory;

  const request = useRequest();
  const { push } = useHistory();

  const { category_guid } = useParams();

  const { showNotification: successNotification } = useNotification("success");
  const { showNotification: errorNotification } = useNotification();

  const [data, setData] = useState({});

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    return await request(
      "get",
      getEndpoint(Endpoints.Categories.editCategory.get),
      {
        guid: category_guid,
      }
    )
      .then((res) => setData(res.data))
      .catch((err) => errorNotification(err.message))
      .finally(() => setLoaded(true));
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleSubmit = () => {
    if (checkForm()) {
      request("post", getEndpoint(Endpoints.Categories.editCategory.update), {
        ...data,
      })
        .then(() => {
          successNotification(ViewStrings.messages.categoryUpdated);
          push(Paths[Views.categories].path);
        })
        .catch((err) => errorNotification(err.message));
    } else errorNotification("Check all input fields");
  };

  const checkForm = () => {
    const { title, description } = data;
    return validateData([title, description]);
  };

  return (
    <GeneralLayout title={ViewStrings.title}>
      <PanelLayout loaded={loaded}>
        <FormControl
          controlId="title"
          value={data.title}
          title={ViewStrings.inputs.titleInput.title}
          placeholder={ViewStrings.inputs.titleInput.placeholder}
          onChange={handleInput}
        />
        <FormControl
          controlId="description"
          maxLength={1000}
          value={data.description}
          title={ViewStrings.inputs.descriptionInput.title}
          placeholder={ViewStrings.inputs.descriptionInput.placeholder}
          onChange={handleInput}
        />
        <div className="d-flex justify-content-end w-100 align-items-center">
          <Button disabled={!checkForm()} onClick={handleSubmit}>
            {GeneralStrings.Update}
          </Button>
        </div>
      </PanelLayout>
    </GeneralLayout>
  );
};

export default EditCategory;
