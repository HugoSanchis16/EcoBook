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
import FormSwitch from "../../../../Components/Form/FormSwitch/FormSwitch";
import { IsbnRegex, NiaRegex, PhoneRegexSpain } from "../../../../Utils/Regex";

const EditStudent = () => {
  const { strings: Strings } = useContext(StringsContext);
  const ViewStrings = Strings.Students.EditStudent;
  const GeneralStrings = Strings.General.App;

  const request = useRequest();
  const { push } = useHistory();

  const { student_guid } = useParams();

  const { showNotification: successNotification } = useNotification("success");
  const { showNotification: errorNotification } = useNotification();

  const [data, setData] = useState({});

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    request("get", getEndpoint(Endpoints.Students.allStudents.edit), {
      guid: student_guid,
    })
      .then((res) => {
        setData(res.data);
        setLoaded(true);
      })
      .catch((err) => errorNotification(err.message));
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleSubmit = () => {
    if (checkForm()) {
      console.log({ data });
      request("post", getEndpoint(Endpoints.Students.editStudent.update), {
        ...data,
      })
        .then(() => {
          successNotification(ViewStrings.messages.studentsUpdated);
          push(Paths[Views.students].path);
        })
        .catch((err) => errorNotification(err.message));
    } else errorNotification("Check all input fields");
  };

  const checkForm = () => {
    const { nia, name, surnames, phone, email } = data;
    return (
      validateData([nia, name, surnames, phone, email]) &&
      PhoneRegexSpain.test(phone) &&
      NiaRegex.test(nia)
    );
  };

  return (
    <GeneralLayout title={ViewStrings.title}>
      <PanelLayout loaded={loaded}>
        <SectionLayout title="Student's identification">
          <FormControl
            controlId="nia"
            maxLength={8}
            disabled
            showMaxLength={false}
            vertical={false}
            value={data.nia}
            title={ViewStrings.inputs.niaInput.title}
            placeholder={ViewStrings.inputs.niaInput.placeholder}
            onChange={handleInput}
          />
        </SectionLayout>
        <SectionLayout title="Student's profile">
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
            controlId="surnames"
            maxLength={50}
            showMaxLength
            vertical={false}
            value={data.surnames}
            title={ViewStrings.inputs.surnameInput.title}
            placeholder={ViewStrings.inputs.surnameInput.placeholder}
            onChange={handleInput}
          />
          <FormControl
            controlId="phone"
            maxLength={50}
            showMaxLength
            vertical={false}
            value={data.phone}
            title={ViewStrings.inputs.phoneInput.title}
            placeholder={ViewStrings.inputs.phoneInput.placeholder}
            onChange={handleInput}
          />
          <FormControl
            controlId="email"
            maxLength={50}
            showMaxLength
            vertical={false}
            value={data.email}
            title={ViewStrings.inputs.emailInput.title}
            placeholder={ViewStrings.inputs.emailInput.placeholder}
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

export default EditStudent;
