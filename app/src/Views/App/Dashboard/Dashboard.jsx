import { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import CustomAreaChart from "../../../Components/Charts/AreaChart";
import SmallPanel from "../../../Components/Charts/SmallPanel/SmallPanel";
import { StringsContext } from "../../../Context/strings.context";
import GeneralLayout from "../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../Layouts/PanelLayout/PanelLayout";
import SectionLayout from "../../../Layouts/SectionLayout/SectionLayout";
import { Endpoints, getEndpoint } from "../../../Constants/endpoints.contants";
import useRequest from "../../../Hooks/useRequest";
import useNotification from "../../../Hooks/useNotification";

const Dashboard = () => {
  const { strings } = useContext(StringsContext);
  const request = useRequest();

  const [data, setData] = useState();
  const { showNotification: errorNotification } = useNotification();

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
    <GeneralLayout title="Home" subtitle="APP DATA STATISTICS">
      {console.log(data)}
      {/* Small Panels */}
      <Row className="d-flex justify-content-center ">
        <Col sm={12} md={6} xxl={3}>
          <SmallPanel
            title="Courses"
            amount={data?.cursesCount}
            showGraph={true}
            color={data?.cursesCountColor}
            graphOptions={{
              accessor: "uv",
            }}
          />
        </Col>
        <Col sm={12} md={6} xxl={3}>
          <SmallPanel
            title="Subjects"
            amount={data?.subjectsCount}
            color={data?.subjectsCountColor}
            showGraph={true}
            graphOptions={{
              accessor: "uv",
            }}
          />
        </Col>
        <Col sm={12} md={6} xxl={3}>
          <SmallPanel
            title="Books"
            amount={data?.booksCount}
            color={data?.booksCountColor}
            showGraph={true}
            graphOptions={{
              accessor: "uv",
            }}
          />
        </Col>
        <Col sm={12} md={6} xxl={3}>
          <SmallPanel
            title="Students"
            amount={data?.studentsCount}
            color={data?.studentsCountColor}
            showGraph={true}
            graphOptions={{
              accessor: "uv",
            }}
          />
        </Col>
      </Row>

      {/* Big Chart */}
      <Row className="d-flex justify-content-center ">
        <Col sm={12} xxl={12}>
          <PanelLayout>
            <SectionLayout
              title="Students"
              subtitle="All students from the last 12 months"
            >
              <CustomAreaChart
                accessor="students"
                data={data?.studentHistory}
                fillColor="#0055ff"
                strokeColor="#00ff"
                options={{
                  showTooltip: true,
                  height: 250,
                  borderColor: "#ffff",
                  borderBottom: true,
                }}
              />
            </SectionLayout>
          </PanelLayout>
        </Col>
      </Row>

      <Row className="d-flex justify-content-center ">
        <Col sm={12} xxl={8}>
          <PanelLayout>
            <SectionLayout
              title="Copies"
              subtitle="All copies from the last 12 months"
            >
              <CustomAreaChart
                accessor="copies"
                data={data?.copiesHistory}
                fillColor="#6930c3"
                strokeColor="#7400b8"
                options={{
                  showTooltip: true,
                  height: 265,
                  borderColor: "#ffff",
                  borderBottom: true,
                }}
              />
            </SectionLayout>
          </PanelLayout>
        </Col>
        <Col sm={12} xxl={4}>
          <Row className="d-flex justify-content-center ">
            <Col sm={12}>
              <SmallPanel
                title="Bad Copies"
                amount={data?.badCopiesCount}
                color={data?.badCopiesColor}
                showGraph={true}
                graphOptions={{
                  accessor: "uv",
                }}
              />
            </Col>
            <Col sm={12}>
              <SmallPanel
                title="Good Copies"
                amount={data?.goodCopiesCount}
                color={data?.goodCopiesColor}
                showGraph={true}
                graphOptions={{
                  accessor: "uv",
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </GeneralLayout>
  );
};

export default Dashboard;
