import { Views } from "react-big-calendar";
import ReactTable from "../../../../Components/Table/Table";
import { Paths } from "../../../../Constants/paths.constants";
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
import { CopyHistoryColumns } from "./CopyHistoryColumns";
import { CopyTabs } from "../Tabs/CopyTabs";
import CopyHistoryModal from "../../../../Modals/CopyHistoryModal/CopyHistoryModal";
import useModalManager from "../../../../Hooks/useModalManager";

const CopyHistory = () => {
  const { startFetching, finishFetching, fetching, loaded } = useLoaded();
  const request = useRequest();

  const {
    closeModal: closeHistoryModal,
    openModal: openHistoryModal,
    show: showHistoryModal,
    data: historyModal,
  } = useModalManager();

  const { copy_uniqid } = useParams();

  const { search } = useLocation();
  const searchParams = useQuery();

  const { showNotification: errorNotification } = useNotification();

  const [data, setData] = useState({});
  const [totalPages, setTotalPages] = useState(1);
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
      getEndpoint(Endpoints.Copies.historyCopy.getHistory),
      {
        uniqid: copy_uniqid,
        page,
        offset,
        search,
      }
    )
      .then((res) => {
        setData(res.copies);
        setTotalPages(res.totalPages);
      })
      .catch(errorNotification)
      .finally(() => finishFetching());
  };

  const handleCloseHistoryModal = (refresh) => {
    if (refresh) fetchData();
    closeHistoryModal();
  };
  return (
    <>
      <CopyHistoryModal
        show={showHistoryModal}
        onClose={handleCloseHistoryModal}
        data={historyModal}
      />
      <GeneralLayout
        loaded={loaded}
        showBackButton={true}
        title={"Copy History"}
      >
        <PanelLayout loaded={loaded} Tabs={CopyTabs}>
          <ReactTable
            emptyData={{
              text: "No history found",
              buttonText: "Go Back !",
              to: Paths[Views.students].path,
              description: "No student has had this book.",
              subDescription: "Press de following button to return back.",
            }}
            totalPages={totalPages}
            fetching={fetching}
            onEventChange={fetchData}
            data={data}
            columns={CopyHistoryColumns(openHistoryModal)}
          />
        </PanelLayout>
      </GeneralLayout>
    </>
  );
};

export default CopyHistory;
