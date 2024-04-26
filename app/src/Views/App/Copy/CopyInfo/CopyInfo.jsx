import useLoaded from "../../../../Hooks/useLoaded";
import GeneralLayout from "../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../Layouts/PanelLayout/PanelLayout";
import { useEffect, useState } from "react";
import useRequest from "../../../../Hooks/useRequest";
import {
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import useQuery from "../../../../Hooks/useQuery";
import useNotification from "../../../../Hooks/useNotification";
import { Configuration } from "../../../../Config/app.config";
import {
  Endpoints,
  getEndpoint,
} from "../../../../Constants/endpoints.contants";
import { CopyTabs } from "../Tabs/CopyTabs";
import SectionLayout from "../../../../Layouts/SectionLayout/SectionLayout";
import { Col, Row } from "react-bootstrap";
import StarsComponent from "./Components/Stars";
import BarcodeComponent from "../../../../Modals/Unassign/UnassignCopyModal.jsx/Components/BarcodeComponent";
import InfoProps from "./Components/InfoProp";

const CopyInfo = () => {
  const { startFetching, finishFetching, fetching, loaded } = useLoaded();
  const request = useRequest();

  const { copy_uniqid } = useParams();

  const { search } = useLocation();
  const searchParams = useQuery();

  const { showNotification: errorNotification } = useNotification();

  const [data, setData] = useState({});

  useEffect(() => {
    fetchData();
  }, [search]);

  const fetchData = async (
    page = 1,
    offset = Configuration.tables.defaultPageSize,
    search = searchParams.get("search")
  ) => {
    startFetching();
    return await request(
      "get",
      getEndpoint(Endpoints.Copies.infoCopy.getInfo),
      {
        uniqid: copy_uniqid,
        page,
        offset,
        search,
      }
    )
      .then((res) => {
        setData(res.data);
        setTotalPages(res.totalPages);
      })
      .catch(errorNotification)
      .finally(() => finishFetching());
  };
  return (
    <GeneralLayout loaded={loaded} showBackButton={true} title={"Copy"}>
      <PanelLayout loaded={loaded} Tabs={CopyTabs}>
        <SectionLayout title="General Info">
          <InfoProps title="Copy code" data={data.uniqid} />
          <InfoProps title="Course" data={data.course_name} />
          <InfoProps title="Subject" data={data.subject_name} />
          <InfoProps title="Book Name" data={data.book_name} />
          <InfoProps
            title="State"
            data={<StarsComponent state={data.state} />}
          />
        </SectionLayout>
        <SectionLayout title="Barcode">
          <BarcodeComponent notitle={true} code={data.uniqid} />
        </SectionLayout>
      </PanelLayout>
    </GeneralLayout>
  );
};

export default CopyInfo;
