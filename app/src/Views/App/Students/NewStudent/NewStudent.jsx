import { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
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
import FormSelect from "../../../../Components/Form/FormSelect/FormSelect";
import FormControl from "../../../../Components/Form/FormControl/FormControl";
import { EmailRegex, PhoneRegexSpain } from "../../../../Utils/Regex";
import FormSwitch from "../../../../Components/Form/FormSwitch/FormSwitch";

const NewStudent = () => {
  const { strings: Strings } = useContext(StringsContext);
  const GeneralStrings = Strings.General.App;
  const ViewStrings = Strings.Students.NewStudent;

  const request = useRequest();
  const { push } = useHistory();

  const { book_guid } = useParams();

  const { showNotification: successNotification } = useNotification("success");
  const { showNotification: errorNotification } = useNotification();

  const [data, setData] = useState({
    repeater: false,
  });
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log({ data });
  }, [data]);

  const fetchData = async () => {
    request("get", getEndpoint(Endpoints.Courses.allCourses.getAllNames))
      .then((res) => {
        setCourses(res.courses);
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
      request("post", getEndpoint(Endpoints.Students.createStudent.create), {
        ...data,
      })
        .then(() => {
          successNotification(ViewStrings.messages.studentsCreated);
          push(Paths[Views.students].path);
        })
        .catch((err) => errorNotification(err.message));
    } else errorNotification("Check all input fields");
  };

  const checkForm = () => {
    const { nia, name, surname, phone, email } = data;
    return (
      validateData([nia, name, surname, phone, email]) &&
      EmailRegex.test(email) &&
      PhoneRegexSpain.test(phone)
    );
  };

  return (
    <GeneralLayout showBackButton title={ViewStrings.title}>
      <PanelLayout>
        <SectionLayout title="Student's Identification">
          <FormControl
            required
            controlId="nia"
            maxLength={8}
            showMaxLength={true}
            vertical={false}
            value={data.nia}
            title={ViewStrings.inputs.niaInput.title}
            placeholder={ViewStrings.inputs.niaInput.placeholder}
            onChange={handleInput}
          />
        </SectionLayout>
        <SectionLayout title="Student's Profile">
          <FormControl
            controlId="name"
            required
            maxLength={200}
            showMaxLength={true}
            vertical={false}
            title={ViewStrings.inputs.nameInput.title}
            placeholder={ViewStrings.inputs.nameInput.placeholder}
            onChange={handleInput}
          />
          <FormControl
            controlId="surname"
            required
            maxLength={200}
            showMaxLength={true}
            vertical={false}
            title={ViewStrings.inputs.surnameInput.title}
            placeholder={ViewStrings.inputs.surnameInput.placeholder}
            onChange={handleInput}
          />
          <FormControl
            controlId="phone"
            required
            maxLength={9}
            showMaxLength={true}
            vertical={false}
            title={ViewStrings.inputs.phoneInput.title}
            placeholder={ViewStrings.inputs.phoneInput.placeholder}
            onChange={handleInput}
          />
          <FormControl
            controlId="email"
            required
            maxLength={200}
            showMaxLength={true}
            vertical={false}
            title={ViewStrings.inputs.emailInput.title}
            placeholder={ViewStrings.inputs.emailInput.placeholder}
            onChange={handleInput}
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

export default NewStudent;
