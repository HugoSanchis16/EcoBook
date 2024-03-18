import { MdRefresh } from "react-icons/md";
import IconButton from "../../../../Components/Buttons/IconButton";
import CustomAreaChart from "../../../../Components/Charts/AreaChart";
import PanelLayout from "../../../../Layouts/PanelLayout/PanelLayout";
import SectionLayout from "../../../../Layouts/SectionLayout/SectionLayout";

const data = [
  {
    name: "",
    uv: Math.round(Math.random() * 9999),
    // pv: 2400,
    // amt: 2400,
  },
  {
    name: "Jan",
    uv: Math.round(Math.random() * 9999),
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    uv: Math.round(Math.random() * 9999),
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    uv: Math.round(Math.random() * 9999),
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Apr",
    uv: Math.round(Math.random() * 9999),
    pv: 3908,
    amt: 2000,
  },
  {
    name: "May",
    uv: Math.round(Math.random() * 9999),
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    uv: Math.round(Math.random() * 9999),
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Jul",
    uv: Math.round(Math.random() * 9999),
    pv: 2000,
    amt: 2100,
  },
  {
    name: "Aug",
    uv: Math.round(Math.random() * 9999),
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Sep",
    uv: Math.round(Math.random() * 9999),
    pv: 2000,
    amt: 2100,
  },
  {
    name: "Oct",
    uv: Math.round(Math.random() * 9999),
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Nov",
    uv: Math.round(Math.random() * 9999),
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Dec",
    uv: Math.round(Math.random() * 9999),
    pv: 3908,
    amt: 2000,
  },
];

const PaymentsGraph = () => {
  return (
    <PanelLayout>
      <SectionLayout
        title="Payments"
        className="mb-0"
        rightSection={
          <IconButton
            // title={!loaded && <Spinner animation="border" size="sm" />}
            Icon={MdRefresh}
            // onClick={fetchData}
          />
        }
      >
        <CustomAreaChart
          accessor="uv"
          data={data}
          fillColor="#00aaff"
          strokeColor="#0055ff"
          options={{
            showXAxis: true,
            XAxisAccessor: "name",
            borderBottom: false,
            borderLeft: false,
            borderColor: "#222",
            showBorders: false,
            height: 285,
            width: "100%",
            showTooltip: true,
          }}
        />
      </SectionLayout>
    </PanelLayout>
  );
};

export default PaymentsGraph;
