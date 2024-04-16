import { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { validateData } from "../../../Config/GeneralFunctions";
import { Endpoints, getEndpoint } from "../../../Constants/endpoints.contants";
import { Paths } from "../../../Constants/paths.constants";
import { Views } from "../../../Constants/views.constants";
import { StringsContext } from "../../../Context/strings.context";
import useNotification from "../../../Hooks/useNotification";
import useRequest from "../../../Hooks/useRequest";
import GeneralLayout from "../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../Layouts/PanelLayout/PanelLayout";
import SectionLayout from "../../../Layouts/SectionLayout/SectionLayout";
import FormSelect from "../../../Components/Form/FormSelect/FormSelect";
import FormControl from "../../../Components/Form/FormControl/FormControl";
import { EmailRegex, PhoneRegexSpain } from "../../../Utils/Regex";
import FormSwitch from "../../../Components/Form/FormSwitch/FormSwitch";

const Asign = () => {
  const { strings: Strings } = useContext(StringsContext);
  const GeneralStrings = Strings.General.App;
  const ViewStrings = Strings.Assign.NewAssign;

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

  const handleCleanCourse = () => {
    setData({
      ...data,
      course: null,
    });
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleSelectedSubjects = (e) => {
    const { id } = e.target;
    const dataCopy = { ...data };
    if (dataCopy.subjects?.includes(id)) {
      dataCopy.subjects = dataCopy.subjects.filter(
        (subject_guid) => subject_guid !== id
      );
    } else {
      dataCopy.subjects.push(id);
    }
    setData({ ...dataCopy });
  };

  const handleChangeCourse = (e) => {
    const { id, value } = e.target;
    request("get", getEndpoint(Endpoints.Subjects.allSubjects.getAllByCourse), {
      course: value,
    })
      .then((res) => {
        setSubjects(res.subjects);
        setData({
          ...data,
          course: value,
          subjects: res.subjects.map((subject) => subject.value),
        });
      })
      .catch(errorNotification);
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

  const handleRepeaterCheckbox = (e) => {
    const { id, checked } = e.target;
    setData({ ...data, [id]: checked });
  };

  const checkForm = () => {
    const { nia, course } = data;
    return validateData([nia, course]);
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
        <SectionLayout title="Subjects Assignments">
          <FormSelect
            options={courses}
            controlId="course"
            vertical={false}
            title={ViewStrings.inputs.courseInput.title}
            placeholder={ViewStrings.inputs.courseInput.placeholder}
            onChange={handleChangeCourse}
            onClean={handleCleanCourse}
            required
          />
          <FormSwitch
            controlId="repeater"
            type="switch"
            value={data.repeater}
            disabled={!data.course}
            vertical={false}
            title={ViewStrings.inputs.repeatStudentInput.title}
            onChange={handleRepeaterCheckbox}
          />
          {data.repeater && (
            <Row className="border p-2 rounded mx-0">
              {subjects.map((subject, idx) => (
                <Col sm={12}>
                  <FormSwitch
                    controlId={subject.value}
                    value={data.subjects.includes(subject.value)}
                    type="switch"
                    vertical={false}
                    title={subject.label}
                    onChange={handleSelectedSubjects}
                  />
                </Col>
              ))}
            </Row>
          )}
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

export default Asign;
