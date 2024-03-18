import { Col, Row } from "react-bootstrap";
import AuditLogs from "../Components/AuditLogs";
import LastSessions from "../Components/LastSessions";

const BottomSection = () => {
  return (
    <Row>
      <Col sm={12} md={4}>
        <LastSessions />
      </Col>
      <Col sm={12} md={8}>
        <AuditLogs />
      </Col>
    </Row>
  );
};

export default BottomSection;
