import moment from "moment";
import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, Spinner } from "react-bootstrap";
import { MdRefresh } from "react-icons/md";
import IconButton from "../../../../Components/Buttons/IconButton";
import {
  Endpoints,
  getEndpoint,
} from "../../../../Constants/endpoints.contants";
import useNotification from "../../../../Hooks/useNotification";
import useRequest from "../../../../Hooks/useRequest";
import PanelLayout from "../../../../Layouts/PanelLayout/PanelLayout";
import SectionLayout from "../../../../Layouts/SectionLayout/SectionLayout";

const LastSessions = () => {
  const request = useRequest();

  const { showNotification: errorNotification } = useNotification();

  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    //fetchData();
  }, []);

  const fetchData = () => {
    setLoaded(false);
    request("get", getEndpoint(Endpoints.Home.middleSection.getLastSessions))
      .then((res) => setData(res.data))
      .catch((err) => errorNotification(err.message))
      .finally(() => setLoaded(true));
  };

  return (
    <PanelLayout>
      <SectionLayout
        title="Last Sessions"
        rightSection={
          <IconButton
            title={!loaded && <Spinner animation="border" size="sm" />}
            Icon={loaded && MdRefresh}
            onClick={fetchData}
          />
        }
      >
        <ListGroup>
          {data.map((item, idx) => (
            <ListGroupItem className="w-100">
              <p className="mb-0">{item.email}</p>
              <small className="text-end w-100">
                {moment(item.startat).format("LLL")}
              </small>
            </ListGroupItem>
          ))}
        </ListGroup>
      </SectionLayout>
    </PanelLayout>
  );
};

export default LastSessions;
