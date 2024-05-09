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
import CustomPieChart from "../../../Components/Charts/PieChart";
import useLoaded from "../../../Hooks/useLoaded";

const Dashboard = () => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.Dashboard;

  const request = useRequest();

  const [data, setData] = useState();
  const { showNotification: errorNotification } = useNotification();

  const [loaded, setLoaded] = useState(false);

  const { finishFetching } = useLoaded();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    return await request("get", getEndpoint(Endpoints.Dashboard.allInfo.getAll))
      .then((res) => {
        setData(res.data);
        setLoaded(true);
      })
      .catch(errorNotification)
      .finally(() => finishFetching());
  };

  return (
    <GeneralLayout
      loaded={loaded}
      title={ViewStrings.title}
      subtitle={ViewStrings.subtitle}
    >
      {/* Small Panels */}
      <Row className="d-flex justify-content-center ">
        <Col sm={12} md={6} xxl={3}>
          <SmallPanel
            title={ViewStrings.smallPanels.titleCourses}
            amount={data?.cursesCount}
            color={data?.cursesCountColor}
          />
        </Col>
        <Col sm={12} md={6} xxl={3}>
          <SmallPanel
            title={ViewStrings.smallPanels.titleSubjects}
            amount={data?.subjectsCount}
            color={data?.subjectsCountColor}
          />
        </Col>
        <Col sm={12} md={6} xxl={3}>
          <SmallPanel
            title={ViewStrings.smallPanels.titleBooks}
            amount={data?.booksCount}
            color={data?.booksCountColor}
          />
        </Col>
        <Col sm={12} md={6} xxl={3}>
          <SmallPanel
            title={ViewStrings.smallPanels.titleStudents}
            amount={data?.studentsCount}
            color={data?.studentsCountColor}
          />
        </Col>
      </Row>

      <Row>
        <Col sm={12} xxl={8}>
          <PanelLayout>
            <SectionLayout title="Copies count by status">
              <CustomPieChart
                accessor="uv"
                data={data?.pieChart}
                fillColor="#00aaff"
                options={{
                  height: 265,
                  width: "100%",
                }}
              />
            </SectionLayout>
          </PanelLayout>
        </Col>
        <Col sm={12} xxl={4}>
          <Row className="d-flex justify-content-center ">
            <Col sm={12}>
              <SmallPanel
                title={ViewStrings.titleGoodCopies}
                amount={data?.goodCopiesCount}
                color={data?.goodCopiesColor}
                showGraph={true}
              />
            </Col>
            <Col sm={12}>
              <SmallPanel
                title={ViewStrings.titleBadCopies}
                amount={data?.badCopiesCount}
                color={data?.badCopiesColor}
                showGraph={true}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Big Chart */}

      <Row className="d-flex justify-content-center ">
        <Col sm={12} xxl={12}>
          <PanelLayout>
            <SectionLayout
              title={ViewStrings.bigChartStudents.title}
              subtitle={ViewStrings.bigChartStudents.subtitle}
            >
              <CustomAreaChart
                accessor={ViewStrings.bigChartStudents.accessor}
                data={data?.studentHistory}
                fillColor="#0055ff"
                strokeColor="#00ff"
                options={{
                  showXAxis: true,
                  XAxisAccessor: "name",
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
        <Col sm={12} xxl={12}>
          <PanelLayout>
            <SectionLayout
              title={ViewStrings.bigChartCopies.title}
              subtitle={ViewStrings.bigChartCopies.subtitle}
            >
              <CustomAreaChart
                accessor={ViewStrings.bigChartCopies.accessor}
                data={data?.copiesHistory}
                fillColor="#6930c3"
                strokeColor="#7400b8"
                options={{
                  showXAxis: true,
                  XAxisAccessor: "name",
                  showTooltip: true,
                  height: 265,
                  borderColor: "#ffff",
                  borderBottom: true,
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
