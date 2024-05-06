import { useContext, useState } from "react";
import FormSelect from "../../../../Components/Form/FormSelect/FormSelect";
import SectionLayout from "../../../../Layouts/SectionLayout/SectionLayout";
import { StringsContext } from "../../../../Context/strings.context";
import useRequest from "../../../../Hooks/useRequest";
import {
  Endpoints,
  getEndpoint,
} from "../../../../Constants/endpoints.contants";
import useNotification from "../../../../Hooks/useNotification";
import FormSwitch from "../../../../Components/Form/FormSwitch/FormSwitch";
import { Col, Row } from "react-bootstrap";

const AssignmentSection = ({ data, setData, courses }) => {
  const request = useRequest();

  const { showNotification: errorNotification } = useNotification();

  const { strings: Strings } = useContext(StringsContext);
  const ViewStrings = Strings.Assign.NewAssign;

  const [subjects, setSubjects] = useState([]);

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

  const handleCleanCourse = () => setData({ ...data, course: null });

  const handleRepeaterCheckbox = (e) => {
    const { id, checked } = e.target;
    setData({ ...data, [id]: checked });
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

  return (
    <SectionLayout title={ViewStrings.tileSection.titleAssignament}>
      <FormSelect
        options={courses}
        controlId="course"
        value={data.course}
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
      {data.repeater && data.course && (
        <Row className="border p-2 rounded mx-0">
          {subjects.map((subject) => (
            <Col sm={12} key={subject.value}>
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
  );
};
export default AssignmentSection;
