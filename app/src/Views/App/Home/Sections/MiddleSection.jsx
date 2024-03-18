import { Col, Row } from "react-bootstrap";
import PaymentsGraph from "../Components/PaymentsGraph";
import StorageGraph from "../Components/StorageGraph";

const MiddleSection = () => {
  return (
    <Row>
      <Col sm={12} md={8}>
        <PaymentsGraph />
      </Col>
      <Col sm={12} md={4}>
        <StorageGraph />
      </Col>
    </Row>
  );
};

export default MiddleSection;
