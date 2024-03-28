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
import { IsbnRegex } from "../../../../Utils/Regex";
import FormSelect from "../../../../Components/Form/FormSelect/FormSelect";
import { CopyStatus } from "../../../../Utils/CopyStatus";

const NewCopy = () => {
  const { strings: Strings } = useContext(StringsContext);
  const GeneralStrings = Strings.General.App;
  const ViewStrings = Strings.Copies.NewCopy;

  const request = useRequest();
  const { push } = useHistory();

  const { book_guid } = useParams();

  const { showNotification: successNotification } = useNotification("success");
  const { showNotification: errorNotification } = useNotification();

  const [data, setData] = useState({});

  const [errors, setErrors] = useState({});

  const [subjects, setSubjects] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    request("get", getEndpoint(Endpoints.Subjects.allSubjects.getAllNames))
      .then((res) => {
        setSubjects(res.subjects);
        setLoaded(true);
      })
      .catch((err) => errorNotification(err.message));
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleCleanState = () => {
    setData({
      ...data,
      subject: null,
    });
  };

  const handleSubmit = () => {
    if (checkForm()) {
      console.log({ data });
      request("post", getEndpoint(Endpoints.Copies.createCopy.create), {
        ...data,
        book_guid,
      })
        .then(() => {
          successNotification(ViewStrings.messages.copyCreated);
          push(Paths[Views.copies].path);
        })
        .catch((err) => errorNotification(err.message));
    } else errorNotification("Check all input fields");
  };

  const checkForm = () => {
    const { state } = data;
    return validateData([state]);
  };

  return (
    <GeneralLayout showBackButton title={ViewStrings.title}>
      <PanelLayout cenetered loaded={loaded}>
        <SectionLayout title="Copy Info">
          <FormSelect
            options={CopyStatus}
            controlId="state"
            value={data.state}
            vertical={false}
            title={ViewStrings.inputs.stateInput.title}
            placeholder={ViewStrings.inputs.stateInput.placeholder}
            onChange={handleInput}
            onClean={handleCleanState}
            required
          />
        </SectionLayout>
        <div className="d-flex justify-content-end w-100 align-items-center">
          <Button disabled={!checkForm()} onClick={handleSubmit}>
            {GeneralStrings.Create}
          </Button>
        </div>
      </PanelLayout>
    </GeneralLayout>
  );
};

export default NewCopy;
