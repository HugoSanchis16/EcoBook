import { useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Notification from "../../Components/Notification/Notification";
import ModalLayout from "../../Layouts/ModalLayout/ModalLayout";
import { Notifications_Data } from "../../Utils/NotificationsData";

const NotificationModal = ({ show, onClose }) => {
  const [notifications, setNotifications] = useState(Notifications_Data);

  return (
    <ModalLayout
      show={show}
      onHide={onClose}
      size="md"
      bodyClass="p-0 rounded-lg overflow-hidden"
    >
      <div className="w-100 p-4">
        <div className="d-flex justify-content-center align-items-center align-items-lg-start flex-column">
          <h3 className="mb-0">Notifications</h3>
        </div>
      </div>
      <div className="d-flex flex-column w-100 px-2">
        <ListGroup className="pb-2">
          {notifications.map((not, idx) => (
            <ListGroupItem key={idx} className="p-0 border-0 mb-2">
              <Notification {...not} />
            </ListGroupItem>
          ))}
          <ListGroupItem className="border-0 text-center text-muted">
            See more...
          </ListGroupItem>
        </ListGroup>
      </div>
    </ModalLayout>
  );
};

export default NotificationModal;
