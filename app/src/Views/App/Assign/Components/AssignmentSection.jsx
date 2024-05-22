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
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import PanelLayout from "../../../../Layouts/PanelLayout/PanelLayout";
import IconButton from "../../../../Components/Buttons/IconButton";
import AssignCopiesModal from "../../../../Modals/Copies/AssignCopiesModal.jsx/AssignCopiesModal";
import useModalManager from "../../../../Hooks/useModalManager";

const AssignmentSection = ({ data, setData, courses }) => {
  const request = useRequest();

  const { showNotification: errorNotification } = useNotification();

  const { strings: Strings } = useContext(StringsContext);
  const ViewStrings = Strings.Assign.NewAssign;

  const [originalSubjects, setOriginalSubjects] = useState([]);
  const [pendingSubject, setPendingSubjects] = useState([]);
  const [assignedSubjects, setAssignedSubjects] = useState([]);

  const {
    closeModal: closeAssignModal,
    openModal: openAssignModal,
    show: showAssignModal,
    data: assignCopyData,
  } = useModalManager();

  const handleChangeCourse = (e) => {
    const { id, value } = e.target;
    request("get", getEndpoint(Endpoints.Subjects.allSubjects.getAllByCourse), {
      course: value,
    })
      .then((res) => {
        setOriginalSubjects(res.subjects);
        setPendingSubjects(res.subjects);
        setData({
          ...data,
          course: value,
          subjects: res.subjects.map((subject) => subject.value),
        });
      })
      .catch(errorNotification);
  };

  const handleCleanCourse = () => setData({ ...data, course: null });

  const handleCloseAssignModal = () => {
    closeAssignModal();
  };

  const SubjectItem = ({ value, label, onClick }) => {
    return (
      <ListGroup.Item
        as={Button}
        className="text-start"
        onClick={onClick}
        key={value}
      >
        {label}
      </ListGroup.Item>
    );
  };

  return (
    <>
      <AssignCopiesModal
        show={showAssignModal}
        onClose={handleCloseAssignModal}
        data={assignCopyData || {}}
      />

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
      </SectionLayout>
      <SectionLayout>
        {data.course && (
          <Row>
            <Col sm={12} md={6}>
              <h6>Pendientes de asignar</h6>
              <ListGroup>
                {pendingSubject.length > 0 ? (
                  pendingSubject.map((subject, idx) => (
                    <SubjectItem
                      {...subject}
                      onClick={() => {
                        openAssignModal(subject);
                      }}
                    />
                  ))
                ) : (
                  <div className="border rounded p-4 d-flex justify-content-center align-items-center">
                    <p className="mb-0 text-center">
                      All subjects already assigned!
                    </p>
                  </div>
                )}
              </ListGroup>
            </Col>
            <Col sm={12} md={6}>
              <h6>Asignados</h6>
              <ListGroup>
                {assignedSubjects.length ? (
                  assignedSubjects.map((subject, idx) => (
                    <SubjectItem
                      {...subject}
                      onClick={() => {
                        openAssignModal(subject);
                      }}
                    />
                  ))
                ) : (
                  <div className="border rounded p-4 d-flex justify-content-center align-items-center">
                    <p className="mb-0 text-center">
                      Select some subject from left list
                    </p>
                  </div>
                )}
              </ListGroup>
            </Col>
          </Row>
        )}
      </SectionLayout>
    </>
  );
};
export default AssignmentSection;
