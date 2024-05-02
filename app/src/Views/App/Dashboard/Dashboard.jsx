import { useContext, useEffect, useState } from "react";
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
import { Endpoints, getEndpoint } from "../../../Constants/endpoints.contants";
import useRequest from "../../../Hooks/useRequest";

const Dashboard = () => {
  const { strings } = useContext(StringsContext);
  const request = useRequest();

  const [data, setData] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    return await request("get", getEndpoint(Endpoints.Dashboard.allInfo.getAll))
      .then((res) => {
        setData(res.data);
      })
      .catch(errorNotification)
      .finally(() => finishFetching());
  };

  return (
    <GeneralLayout title={strings.Analytics}>
      {/* Small Panels */}
      <Row>
        <Col sm={12} md={6} xxl={4}>
          <SmallPanel
            title="Courses"
            amount={data?.cursesCount}
            showGraph={true}
            graphOptions={{
              accessor: "uv",
              color: data?.cursesCountColor,
              data: [
                {
                  name: "Page A",
                  uv: Math.round(Math.random() * 9999),
                  pv: 2400,
                  amt: 2400,
                },
                {
                  name: "Page B",
                  uv: Math.round(Math.random() * 9999),
                  pv: 1398,
                  amt: 2210,
                },
                {
                  name: "Page C",
                  uv: Math.round(Math.random() * 9999),
                  pv: 9800,
                  amt: 2290,
                },
                {
                  name: "Page D",
                  uv: Math.round(Math.random() * 9999),
                  pv: 3908,
                  amt: 2000,
                },
                {
                  name: "Page E",
                  uv: Math.round(Math.random() * 9999),
                  pv: 4800,
                  amt: 2181,
                },
                {
                  name: "Page F",
                  uv: Math.round(Math.random() * 9999),
                  pv: 3800,
                  amt: 2500,
                },
                {
                  name: "Page G",
                  uv: Math.round(Math.random() * 9999),
                  pv: 4300,
                  amt: 2100,
                },
              ],
            }}
          />
        </Col>
        <Col sm={12} md={6} xxl={4}>
          <SmallPanel
            title="Copies"
            amount={data?.copiesCount}
            showGraph={true}
            graphOptions={{
              accessor: "uv",
              color: data?.copiesCountColor,
              data: [
                {
                  name: "Page A",
                  uv: Math.round(Math.random() * 9999),
                  pv: 2400,
                  amt: 2400,
                },
                {
                  name: "Page B",
                  uv: Math.round(Math.random() * 9999),
                  pv: 1398,
                  amt: 2210,
                },
                {
                  name: "Page C",
                  uv: Math.round(Math.random() * 9999),
                  pv: 9800,
                  amt: 2290,
                },
                {
                  name: "Page D",
                  uv: Math.round(Math.random() * 9999),
                  pv: 3908,
                  amt: 2000,
                },
                {
                  name: "Page E",
                  uv: Math.round(Math.random() * 9999),
                  pv: 4800,
                  amt: 2181,
                },
                {
                  name: "Page F",
                  uv: Math.round(Math.random() * 9999),
                  pv: 3800,
                  amt: 2500,
                },
                {
                  name: "Page G",
                  uv: Math.round(Math.random() * 9999),
                  pv: 4300,
                  amt: 2100,
                },
              ],
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={6} xxl={4}>
          <SmallPanel
            title="Good Copies"
            amount={data?.goodCopiesCount}
            showGraph={true}
            graphOptions={{
              accessor: "uv",
              color: data?.goodCopiesColor,
              data: [
                {
                  name: "Page A",
                  uv: Math.round(Math.random() * 9999),
                  pv: 2400,
                  amt: 2400,
                },
                {
                  name: "Page B",
                  uv: Math.round(Math.random() * 9999),
                  pv: 1398,
                  amt: 2210,
                },
                {
                  name: "Page C",
                  uv: Math.round(Math.random() * 9999),
                  pv: 9800,
                  amt: 2290,
                },
                {
                  name: "Page D",
                  uv: Math.round(Math.random() * 9999),
                  pv: 3908,
                  amt: 2000,
                },
                {
                  name: "Page E",
                  uv: Math.round(Math.random() * 9999),
                  pv: 4800,
                  amt: 2181,
                },
                {
                  name: "Page F",
                  uv: Math.round(Math.random() * 9999),
                  pv: 3800,
                  amt: 2500,
                },
                {
                  name: "Page G",
                  uv: Math.round(Math.random() * 9999),
                  pv: 4300,
                  amt: 2100,
                },
              ],
            }}
          />
        </Col>
        <Col sm={12} md={6} xxl={4}>
          <SmallPanel
            title="Bad Copies"
            amount={data?.badCopiesCount}
            showGraph={true}
            graphOptions={{
              accessor: "uv",
              color: data?.badCopiesColor,
              data: [
                {
                  name: "Page A",
                  uv: Math.round(Math.random() * 9999),
                  pv: 2400,
                  amt: 2400,
                },
                {
                  name: "Page B",
                  uv: Math.round(Math.random() * 9999),
                  pv: 1398,
                  amt: 2210,
                },
                {
                  name: "Page C",
                  uv: Math.round(Math.random() * 9999),
                  pv: 9800,
                  amt: 2290,
                },
                {
                  name: "Page D",
                  uv: Math.round(Math.random() * 9999),
                  pv: 3908,
                  amt: 2000,
                },
                {
                  name: "Page E",
                  uv: Math.round(Math.random() * 9999),
                  pv: 4800,
                  amt: 2181,
                },
                {
                  name: "Page F",
                  uv: Math.round(Math.random() * 9999),
                  pv: 3800,
                  amt: 2500,
                },
                {
                  name: "Page G",
                  uv: Math.round(Math.random() * 9999),
                  pv: 4300,
                  amt: 2100,
                },
              ],
            }}
          />
        </Col>
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
