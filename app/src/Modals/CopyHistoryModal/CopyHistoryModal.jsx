import { Button } from "react-bootstrap";
import ModalLayout from "../../Layouts/ModalLayout/ModalLayout";
import SectionLayout from "../../Layouts/SectionLayout/SectionLayout";
import InfoProps from "../../Views/App/Copy/CopyInfo/Components/InfoProp";
import StarsComponent from "../../Views/App/Copy/CopyInfo/Components/Stars";
import moment from "moment";

const CopyHistoryModal = ({ show, onClose, data }) => {
  const hideModal = () => {
    onClose();
  };

  return (
    <ModalLayout show={show} onHide={hideModal} size="lg">
      <SectionLayout title="General Student Information">
        <InfoProps title="NIA" data={data?.student_nia} />
        <InfoProps title="Name" data={data?.student_name} />
        <InfoProps title="Email" data={data?.student_email} />
        <InfoProps title="Phone" data={data?.student_phone} />
      </SectionLayout>
      <SectionLayout title="Copy Information">
        <InfoProps title="Code" data={data?.uniqid} />
        <InfoProps title="Book Name" data={data?.book_name} />
        <InfoProps title="ISBN" data={data?.book_isbn} />
        <InfoProps title="Course" data={data?.course_name} />
        <InfoProps title="Subject" data={data?.subject_name} />
      </SectionLayout>
      <SectionLayout title="Delivery Information">
        <InfoProps
          title="Delivery date"
          data={moment(data?.initialdate, "YYYY-MM-DD HH:mm:SS").format(
            "DD-MM-YYYY"
          )}
        />
        <InfoProps
          title="State"
          data={<StarsComponent state={data?.initialstate} />}
        />
      </SectionLayout>
      <SectionLayout title="Return Information">
        <InfoProps
          title="Return date"
          data={
            data?.finaldate ? (
              moment(data?.finaldate, "YYYY-MM-DD HH:mm:SS").format(
                "DD-MM-YYYY"
              )
            ) : (
              <span className="bg-info-subtle p-1 rounded-2 ">In Use</span>
            )
          }
        />
        <InfoProps
          title="State"
          data={
            data?.finaldate ? (
              <StarsComponent state={data?.finalstate} />
            ) : (
              <span className="bg-info-subtle p-1 rounded-2 ">In Use</span>
            )
          }
        />
        <InfoProps title="Observations" data={data?.observations} />
      </SectionLayout>
      <div className="d-flex justify-content-end gap-2">
        <Button variant="danger" size="lm" onClick={hideModal}>
          Close
        </Button>
      </div>
    </ModalLayout>
  );
};

export default CopyHistoryModal;
