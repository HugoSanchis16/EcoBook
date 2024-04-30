import { useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomAreaChart from "../../../Components/Charts/AreaChart";
import CustomPieChart from "../../../Components/Charts/PieChart";
import SmallPanel from "../../../Components/Charts/SmallPanel/SmallPanel";
import { Paths } from "../../../Constants/paths.constants";
import { Views } from "../../../Constants/views.constants";
import { StringsContext } from "../../../Context/strings.context";
import GeneralLayout from "../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../Layouts/PanelLayout/PanelLayout";
import SectionLayout from "../../../Layouts/SectionLayout/SectionLayout";
import { BasicData } from "./data";

const Dashboard = () => {
  const { strings } = useContext(StringsContext);

  return (
    <GeneralLayout title={strings.Analytics}>
      {/* Small Panels */}
      <Row>
        {BasicData.map((item, idx) => (
          <Col sm={12} md={6} xxl={4} key={idx}>
            <SmallPanel
              title={item.title}
              amount={item.totalItems}
              showGraph={true}
              key={idx}
              graphOptions={{
                accessor: "uv",
                color: item.color,
                data: item.history,
              }}
            />
          </Col>
        ))}
      </Row>

      {/* Big Chart */}
      <Row>
        <Col sm={12} xxl={8}>
          <PanelLayout>
            <SectionLayout
              title="Sessions"
              subtitle="Last application sessions"
              rightSection={
                <Button
                  variant="link"
                  size="sm"
                  as={Link}
                  to={Paths[Views.tableView].path}
                >
                  View more
                </Button>
              }
            >
              <CustomAreaChart
                accessor="uv"
                data={BasicData[0].history}
                fillColor="#00aaff"
                strokeColor="#0055ff"
                options={{
                  borderBottom: true,
                  borderLeft: true,
                  borderColor: "#222",
                  showBorders: true,
                  height: 300,
                  width: "100%",
                  showTooltip: true,
                }}
              />
            </SectionLayout>
          </PanelLayout>
        </Col>
        <Col sm={12} xxl={4}>
          <PanelLayout>
            <SectionLayout
              title="Devices"
              subtitle="Different types of devices"
              rightSection={
                <Button
                  variant="link"
                  size="sm"
                  as={Link}
                  to={Paths[Views.tableView].path}
                >
                  View more
                </Button>
              }
            >
              <CustomPieChart
                accessor="uv"
                data={BasicData[0].history}
                fillColor="#00aaff"
                options={{
                  borderBottom: true,
                  borderLeft: true,
                  borderColor: "#222",
                  showBorders: true,
                  height: 300,
                  width: "100%",
                  showTooltip: true,
                }}
              />
            </SectionLayout>
          </PanelLayout>
        </Col>
      </Row>
    </GeneralLayout>
  );
};

export default Dashboard;
