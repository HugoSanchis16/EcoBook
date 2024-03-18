import { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SmallPanel from "../../../../Components/Charts/SmallPanel/SmallPanel";
import { Paths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";
import { StringsContext } from "../../../../Context/strings.context";
import useNotification from "../../../../Hooks/useNotification";
import useRequest from "../../../../Hooks/useRequest";
import { Colors } from "../../../../Utils/Colors";

const TopSection = () => {
  const { strings: Strings } = useContext(StringsContext);
  const ViewStrings = Strings.Home.TopSection;

  const request = useRequest();

  const { push } = useHistory();

  const { showNotification: errorNotification } = useNotification();

  const [data, setData] = useState({});

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  //   const fetchData = () => {
  //     request("get", getEndpoint(Endpoints.Home.topSection.getTopValues))
  //       .then((res) => setData(res.data))
  //       .catch((err) => errorNotification(err.message));
  //   };

  const handleSmallPanelPath = (path) => push(path);

  return (
    <Row>
      <Col sm={12} lg={4}>
        <SmallPanel
          color={Colors.green}
          title={ViewStrings.Organisations}
          amount={data.organisations || "-"}
          showGraph={false}
          onClick={() => handleSmallPanelPath(Paths[Views.organisations].path)}
        />
      </Col>
      <Col sm={12} lg={4}>
        <SmallPanel
          color={Colors.blue}
          title={ViewStrings.Users}
          amount={data.users || "-"}
          showGraph={false}
          onClick={() => handleSmallPanelPath(Paths[Views.users].path)}
        />
      </Col>
      <Col sm={12} lg={4}>
        <SmallPanel
          color={Colors.yellow}
          title={ViewStrings.Players}
          amount={data.players || "-"}
          showGraph={false}
          onClick={() => handleSmallPanelPath(Paths[Views.players].path)}
        />
      </Col>
    </Row>
  );
};

export default TopSection;
